import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  children?: React.ReactNode;
  permissionKey?: Key;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the button and shows a shield icon
   *   with a permission-metadata tooltip.
   * - `'hide'` — renders nothing.
   *
   * Ignored when `permissionKey` is not provided.
   */
  permissionAction?: PermissionAction;
}

export function Button({
  label,
  children,
  permissionKey,
  permissionAction = 'showShield',
  disabled,
  ...props
}: ButtonProps): JSX.Element {
  const hasPermission = useHasPermission(permissionKey);

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return (
      <MuiButton {...props} disabled={disabled}>
        {label}
        {children}
      </MuiButton>
    );
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return <></>;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="badge">
      <MuiButton {...props} disabled={true}>
        {label}
        {children}
      </MuiButton>
    </PermissionShield>
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
