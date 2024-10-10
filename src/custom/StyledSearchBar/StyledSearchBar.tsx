import { SxProps, Theme, useTheme } from '@mui/material';
import React from 'react';
import { InputAdornment } from '../../base';
import { SearchIcon } from '../../icons';
import { InputAdornmentEnd, StyledSearchInput } from './style';

interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
  label?: string;
  placeholder?: string;
  sx?: SxProps<Theme>;
  endAdornment?: React.ReactNode;
}

/**
 * StyledSearchBar component renders a search input field with customizable properties.
 *
 * @param {Object} props - The component props.
 * @param {function} [props.onChange] - Function to handle the change event when the search input value changes.
 * @param {string} [props.value] - The current value of the search input.
 * @param {string} [props.label] - The label for the search input.
 * @param {string} [props.placeholder] - The placeholder text for the search input.
 * @param {Object} [props.sx] - The style object for the search input.
 * @param {React.ReactNode} [props.endAdornment] - The element to display at the end of the search input.
 *
 * @returns {JSX.Element} The rendered StyledSearchBar component.
 */
function StyledSearchBar({
  onChange,
  value,
  label,
  sx,
  placeholder,
  endAdornment
}: SearchBarProps): JSX.Element {
  const theme = useTheme();

  return (
    <StyledSearchInput
      type="search"
      label={label}
      fullWidth
      value={value}
      onChange={onChange}
      sx={sx}
      placeholder={placeholder ?? 'Search'}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon fill={theme.palette.background.neutral?.default} />
        </InputAdornment>
      }
      endAdornment={<InputAdornmentEnd position="end">{endAdornment}</InputAdornmentEnd>}
    />
  );
}

export default StyledSearchBar;
