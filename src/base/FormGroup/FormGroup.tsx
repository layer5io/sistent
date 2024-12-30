import { FormGroup as MuiFormGroup, FormGroupProps as MuiFormGroupProps } from '@mui/material';
import React from 'react';

const FormGroup = React.forwardRef<HTMLDivElement, MuiFormGroupProps>((props, ref) => {
  return <MuiFormGroup {...props} ref={ref} />;
});

export { FormGroup };
