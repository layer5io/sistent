import React, { Fragment, type ChangeEvent, type FC, type ReactNode } from 'react';
import {} from '../';
import { Box } from '../base/Box';
import { InputAdornment, TextField } from '../base/Input';

interface SearchBarProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  width?: string;
  label: string;
  endAdornment?: ReactNode;
}

const SearchBar: FC<SearchBarProps> = (
  { onChange, value, width, label, endAdornment, ...props }
) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default SearchBar;
