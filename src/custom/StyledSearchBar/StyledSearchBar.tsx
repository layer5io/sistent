import React from 'react';
import { Box } from '../../base/Box';
import { InputAdornment } from '../../base/Input';
import { TextField } from '../../base/TextField';

interface SearchBarProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  width?: string;
  label: string;
  endAdornment?: React.ReactNode;
}

function StyledSearchBar({
  onChange,
  onKeyDown,
  value,
  width,
  label,
  endAdornment,
  ...props
}: SearchBarProps): JSX.Element {
  return (
    <React.Fragment>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { width }
        }}
        {...props}
      >
        <TextField
          variant="outlined"
          label={label}
          fullWidth
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          sx={{
            margin: 'auto',
            height: '5ch'
          }}
          placeholder="Search"
          InputProps={{
            endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>
          }}
        />
      </Box>
    </React.Fragment>
  );
}

export default StyledSearchBar;
