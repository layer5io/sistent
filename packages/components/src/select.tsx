import React from 'react';
import { Select as MuiSelect, SelectProps } from '@mui/material';

export const Select = (props: SelectProps) => {
  return <MuiSelect {...props} />;
};
