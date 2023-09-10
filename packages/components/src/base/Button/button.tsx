import { Button as MuiButton, type ButtonProps } from '@mui/material';
import React from 'react';

export function Button(props: ButtonProps) {
  return <MuiButton {...props} />;
}
