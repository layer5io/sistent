import { Checkbox as MuiCheckbox, type CheckboxProps } from '@mui/material';
import React from 'react';

const Checkbox = React.forwardRef<HTMLDivElement, CheckboxProps>((props, ref) => {
  return <MuiCheckbox {...props} ref={ref} />;
});

export default Checkbox;
