import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps as MuiAutocompleteProps
} from '@mui/material';
import React from 'react';

export type AutocompleteProps<
  T,
  Multiple extends boolean = false,
  DisableClearable extends boolean = false,
  FreeSolo extends boolean = false
> = MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>;

export const Autocomplete = React.forwardRef<HTMLDivElement, AutocompleteProps<unknown>>(
  (props, ref) => {
    return <MuiAutocomplete {...props} ref={ref} />;
  }
);

export default Autocomplete;
