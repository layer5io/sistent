import { InputAdornment as MuiInputAdornment, type InputAdornmentProps } from '@mui/material';
import React from 'react';

const InputAdornment = React.forwardRef<HTMLDivElement, InputAdornmentProps>((props, ref) => {
  return <MuiInputAdornment {...props} ref={ref} />;
});

export { InputAdornment };
