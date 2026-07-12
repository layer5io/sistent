import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material';
import React from 'react';
import { useHasPermission, type PermissionAction } from '../../custom/PermissionProvider';
import { Key, PermissionShield } from '../../custom/permissions';

export interface MenuItemProps extends MuiMenuItemProps {
  permissionKey?: Key;
  /**
   * Determines behavior when the user lacks the required permission.
   *
   * - `'showShield'` (default) — disables the item and shows a shield icon
   *   with a permission-metadata tooltip.
   * - `'hide'` — renders nothing.
   *
   * Ignored when `permissionKey` is not provided.
   */
  permissionAction?: PermissionAction;
}

export function MenuItem(props: MenuItemProps): JSX.Element {
  const { permissionKey, permissionAction = 'showShield', disabled, ...rest } = props;
  const hasPermission = useHasPermission(permissionKey);

  // No permissionKey or user has permission → render normally
  if (!permissionKey || hasPermission) {
    return <MuiMenuItem {...rest} disabled={disabled} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return <></>;
  }

  return (
    <PermissionShield permissionKey={permissionKey} variant="inline">
      <MuiMenuItem {...rest} disabled={true} />
    </PermissionShield>
  );
}

export default MenuItem;
