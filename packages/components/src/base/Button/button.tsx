import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  children?: ReactNode;
}

export function Button({ label, children, ...props }: ButtonProps) {
  return (
    <MuiButton {...props}>
      {label}
      {children}
    </MuiButton>
  );
}
