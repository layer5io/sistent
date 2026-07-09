import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';
import { Key, PermissionShield } from '../../custom/permissions';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  children?: React.ReactNode;
  permissionKey?: Key;
}

export function Button({
  label,
  children,
  permissionKey,
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  // When disabled AND permissionKey is provided, show the shield overlay
  if (disabled && permissionKey) {
    return (
      <PermissionShield permissionKey={permissionKey} variant="badge">
        <MuiButton {...props} disabled={true}>
          {label}
          {children}
        </MuiButton>
      </PermissionShield>
    );
  }

  return (
    <MuiButton {...props} disabled={disabled}>
      {label}
      {children}
    </MuiButton>
  );
}

export const ContainedButton = (props: ButtonProps): JSX.Element => (
  <Button variant="contained" {...props}>
    {props.children}
  </Button>
);
export const OutlinedButton = (props: ButtonProps): JSX.Element => (
  <Button variant="outlined" {...props}>
    {props.children}
  </Button>
);
export const TextButton = (props: ButtonProps): JSX.Element => (
  <Button variant="text" {...props}>
    {props.children}
  </Button>
);

export default Button;
