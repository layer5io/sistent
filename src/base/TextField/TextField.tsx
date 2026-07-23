import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps } from '@mui/material';
import React from 'react';

const TextField = React.forwardRef<HTMLDivElement, MuiTextFieldProps>((props, ref) => {
  return <MuiTextField {...props} ref={ref} />;
});

export default TextField;
