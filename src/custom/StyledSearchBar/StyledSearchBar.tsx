import { SxProps, Theme } from '@mui/material';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { InputAdornment } from '../../base';
import { SearchIcon } from '../../icons';
import { useTheme } from '../../theme';
import { InputAdornmentEnd, StyledSearchInput } from './style';

interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
  label?: string;
  placeholder?: string;
  sx?: SxProps<Theme>;
  endAdornment?: React.ReactNode;
  debounceTime?: number;
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
 * @param {number} [props.debounceTime] - The debounce time for the input change handler.
 *
 * @returns {JSX.Element} The rendered StyledSearchBar component.
 */
function StyledSearchBar({
  onChange,
  value,
  label,
  sx,
  placeholder,
  endAdornment,
  debounceTime = 300
}: SearchBarProps): JSX.Element {
  const theme = useTheme();
  const [inputValue, setInputValue] = useState(value ?? '');

  useEffect(() => {
    if (value !== undefined && value !== inputValue) {
      setInputValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const handler = debounce((newValue: string) => {
      if (onChange) {
        const syntheticEvent = {
          target: { value: newValue },
          persist: () => {}
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }
    }, debounceTime);

    handler(inputValue);

    return () => {
      handler.cancel();
    };
  }, [inputValue, onChange, debounceTime]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <StyledSearchInput
      type="search"
      label={label}
      fullWidth
      value={inputValue}
      onChange={handleChange}
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
