import React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@mui/material';

export const TextField = (props: TextFieldProps) => {
  return <MuiTextField {...props} />;
};
