import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';
import { Key, PermissionAction, usePermission, PermissionShield } from '../../custom/permissions';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  children?: React.ReactNode;
  permissionKey?: Key;
  permissionAction?: PermissionAction;
}

export function Button({
  label,
  children,
  permissionKey,
  permissionAction = 'disable',
  ...props
}: ButtonProps): JSX.Element | null {
  const { hasPermission, action } = usePermission({ permissionKey, permissionAction });

  if (!hasPermission) {
    switch (action) {
      case 'hide':
        return null;
      case 'showShield':
        return (
          <PermissionShield permissionKey={permissionKey!} variant="badge">
            <MuiButton {...props} disabled={true}>
              {label}
              {children}
            </MuiButton>
          </PermissionShield>
        );
      case 'disable':
      default:
        return (
          <MuiButton {...props} disabled={true}>
            {label}
            {children}
          </MuiButton>
        );
    }
  }

  return (
    <MuiButton {...props}>
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
