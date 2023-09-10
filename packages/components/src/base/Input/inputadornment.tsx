import { InputAdornment as MuiInputAdornment, type InputAdornmentProps } from '@mui/material';
import React from 'react';

export function InputAdornment(props: InputAdornmentProps): JSX.Element {
  return <MuiInputAdornment {...props} />;
}
