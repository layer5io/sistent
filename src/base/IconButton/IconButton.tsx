import {
  IconButton as MuiIconButton,
  type IconButtonProps as MuiIconButtonProps
} from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export interface IconButtonProps extends MuiIconButtonProps {
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

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>((props, ref) => {
  const { permissionKey, permissionAction = 'showShield', disabled, ...rest } = props;
  const hasPermission = useHasPermission(permissionKey);

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return <MuiIconButton ref={ref} {...rest} disabled={disabled} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return null;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="badge">
      <MuiIconButton ref={ref} {...rest} disabled={true} />
    </PermissionShield>
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
