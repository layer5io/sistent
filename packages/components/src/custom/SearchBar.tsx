import { CloseIcon, SearchIcon } from '@layer5/sistent-svg';
import React from 'react';
import { ClickAwayListener } from '../base/ClickAwayListener';
import { TextField } from '../base/TextField';
import TooltipIcon from './TooltipIcon';

export interface SearchBarProps {
  onSearch: (searchText: string) => void;
  style?: React.CSSProperties;
  placeholder?: string;
  onClear?: () => void;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  iconFill?: string;
}

function SearchBar({
  onSearch,
  placeholder,
  onClear,
  expanded,
  setExpanded,
  iconFill
}: SearchBarProps): JSX.Element {
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

  // const handleClickAway = (): void => {
  //   if (expanded) {
  //     setExpanded(false);
  //   }
  // };

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
        <TextField
          variant="standard"
          value={searchText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearchChange(e);
            onSearch(e.target.value);
          }}
          inputRef={searchRef}
          placeholder={placeholder}
          style={{
            width: expanded ? '150px' : '0',
            opacity: expanded ? 1 : 0,
            transition: 'width 0.3s ease, opacity 0.3s ease'
          }}
        />
        {expanded ? (
          <TooltipIcon
            title="Close"
            onClick={handleClearIconClick}
            icon={<CloseIcon fill={iconFill} />}
            arrow
          />
        ) : (
          <TooltipIcon
            title="Search"
            onClick={handleSearchIconClick}
            icon={<SearchIcon fill={iconFill} />}
            arrow
          />
        )}
      </div>
    </ClickAwayListener>
  );
}

export default SearchBar;
