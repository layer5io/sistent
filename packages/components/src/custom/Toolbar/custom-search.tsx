import { IconButton, TextField, Tooltip } from '@layer5/sistent-components';
import React, { useRef, useState } from 'react';
import CloseIcon from '../../../../svg/src/icons/Close/closeIcon';
import SearchIcon from '../../../../svg/src/icons/Search/searchIcon';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  onClear?: () => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onClear, expanded, setExpanded }) => {
  const [searchText, setSearchText] = useState('');
  const searchRef = useRef<HTMLInputElement | null>(null);

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

  //Todo: Need a width utility function
  //  const width = window.innerWidth;
  //   let searchWidth = "200px";
  //   if (width <= 360) {
  //     searchWidth = "100px";
  //   }

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
            <CloseIcon fill="#00D3A9" />
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
            <SearchIcon fill="#00D3A9" />
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
};

export default SearchBar;
