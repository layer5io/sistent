import { Button as MuiButton, type ButtonProps } from '@mui/material';
import * as React from 'react';

export function Button(props: ButtonProps) {
  return <MuiButton {...props} />;
}
