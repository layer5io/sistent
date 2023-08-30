import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import React from 'react';

export const TextField = (props: TextFieldProps) => {
  return <MuiTextField {...props} />;
};
