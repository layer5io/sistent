/* eslint-disable react-hooks/exhaustive-deps */
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import debounce from 'lodash/debounce';
import React, { useCallback } from 'react';
import { ClickAwayListener } from '../base/ClickAwayListener';
import { TextField } from '../base/TextField';
import { CloseIcon, SearchIcon } from '../icons';
import { useTheme } from '../theme';
import TooltipIcon from './TooltipIcon';

const customTheme = (theme: Theme) =>
  createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '--TextField-brandBorderColor': theme.palette.border.strong,
            '--TextField-brandBorderHoverColor': theme.palette.background.graphics?.default,
            '--TextField-brandBorderFocusedColor': theme.palette.background.graphics?.default,
            '& label.Mui-focused': {
              color: 'var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: 'var(--TextField-brandBorderColor)'
          },
          root: {
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderHoverColor)'
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            color: theme.palette.text.default,
            '&::before': {
              borderBottom: '2px solid var(--TextField-brandBorderColor)'
            },
            '&:hover:not(.Mui-disabled, .Mui-error):before': {
              borderBottom: '2px solid var(--TextField-brandBorderHoverColor)'
            },
            '&.Mui-focused:after': {
              borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)'
            }
          }
        }
      }
    }
  });

export interface SearchBarProps {
  onSearch: (searchText: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  onClear?: () => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

function SearchBar({
  onSearch,
  placeholder,
  onClear,
  expanded,
  setExpanded
}: SearchBarProps): JSX.Element {
  const [searchText, setSearchText] = React.useState('');
  const searchRef = React.useRef<HTMLInputElement | null>(null);
  const theme = useTheme();

  // Debounce the onSearch function
  const debouncedOnSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setSearchText(value);
    debouncedOnSearch(value);
  };

  const handleClearIconClick = (): void => {
    debouncedOnSearch('');
    setSearchText('');
    setExpanded(false);
    if (onClear) {
      onClear();
    }
  };

  const handleSearchIconClick = (): void => {
    if (expanded) {
      debouncedOnSearch('');
      setSearchText('');
      setExpanded(false);
    } else {
      setExpanded(true);
      setTimeout(() => {
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }, 300);
    }
  };

  return (
    <ClickAwayListener
      onClickAway={(event) => {
        const isTable = (event.target as HTMLElement)?.closest('#ref');

        if (searchText !== '') {
          return;
        }
        if (isTable) {
          handleClearIconClick(); // Close the search bar as needed
        }
      }}
    >
      <div>
        <ThemeProvider theme={customTheme(theme)}>
          <TextField
            variant="standard"
            value={searchText}
            onChange={handleSearchChange} // Updated to use the new handler
            inputRef={searchRef}
            placeholder={placeholder}
            style={{
              width: expanded ? '150px' : '0',
              opacity: expanded ? 1 : 0,
              transition: 'width 0.3s ease, opacity 0.3s ease'
            }}
          />
        </ThemeProvider>
        {expanded ? (
          <TooltipIcon
            title="Close"
            onClick={handleClearIconClick}
            icon={<CloseIcon fill={theme.palette.icon.default} />}
            arrow
          />
        ) : (
          <TooltipIcon
            title="Search"
            onClick={handleSearchIconClick}
            icon={<SearchIcon fill={theme.palette.icon.default} />}
            arrow
          />
        )}
      </div>
    </ClickAwayListener>
  );
}

export default SearchBar;
