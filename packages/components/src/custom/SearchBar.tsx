import { CloseIcon, SearchIcon } from '@layer5/sistent-svg';
import React from 'react';
import { IconButton } from '../base/IconButton';
import { TextField } from '../base/TextField';
import { Tooltip } from '../base/Tooltip';

export interface SearchBarProps {
  onSearch: (searchText: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  onClear?: () => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

function SearchBar({ placeholder, onClear, expanded, setExpanded }: SearchBarProps): JSX.Element {
  const [searchText, setSearchText] = React.useState('');
  const searchRef = React.useRef<HTMLInputElement | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  const handleClearIconClick = (): void => {
    setSearchText('');
    setExpanded(false);
    if (onClear) {
      onClear();
    }
  };

  const handleSearchIconClick = (): void => {
    if (expanded) {
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
    <div>
      <TextField
        variant="standard"
        value={searchText}
        onChange={handleSearchChange}
        inputRef={searchRef}
        placeholder={placeholder}
        style={{
          width: '150px',
          opacity: expanded ? 1 : 0,
          transition: 'width 0.3s ease, opacity 0.3s ease'
        }}
      />

      {expanded ? (
        <Tooltip title="Close">
          <IconButton
            onClick={handleClearIconClick}
            sx={{
              '&:hover': {
                '& svg': {
                  fill: '#00D3A9'
                },
                borderRadius: '4px'
              }
            }}
            disableRipple
          >
            <CloseIcon fill="#3c494f" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Search" arrow>
          <IconButton
            onClick={handleSearchIconClick}
            sx={{
              '&:hover': {
                '& svg': {
                  fill: '#00D3A9'
                },
                borderRadius: '4px'
              }
            }}
            disableRipple
          >
            <SearchIcon fill="#3c494f" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default SearchBar;
