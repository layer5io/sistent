import { Input as MuiInput, type InputProps } from '@mui/material';
import React from 'react';

const Input = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  return <MuiInput {...props} ref={ref} />;
});

export { Input };
