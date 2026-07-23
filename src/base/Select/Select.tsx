import { Select as MuiSelect, type SelectProps as MuiSelectProps } from '@mui/material';
import React from 'react';

const Select = React.forwardRef<HTMLDivElement, MuiSelectProps>((props, ref) => {
  return <MuiSelect {...props} ref={ref} />;
});

export default Select;
