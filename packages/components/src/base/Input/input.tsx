import { Input as MuiInput, type InputProps } from '@mui/material';
import React from 'react';

export function Input(props: InputProps): JSX.Element {
  return <MuiInput {...props} />;
}
