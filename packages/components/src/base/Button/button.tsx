import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
}

export function Button({ label, ...props }: ButtonProps) {
  return <MuiButton {...props}>{label}</MuiButton>;
}
