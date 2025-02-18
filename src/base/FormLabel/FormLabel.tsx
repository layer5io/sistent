import { FormLabelProps as MuiFormLabelProps, FormLabel as MuiFormLable } from '@mui/material';
import React from 'react';

const FormLabel = React.forwardRef<HTMLLabelElement, MuiFormLabelProps>((props, ref) => {
  return <MuiFormLable {...props} ref={ref} />;
});

export { FormLabel };
