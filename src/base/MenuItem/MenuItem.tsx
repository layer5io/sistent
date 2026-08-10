import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material';
import React from 'react';
import {
  useHasPermission,
  type PermissionAction,
  type PermissionKeySpec
} from '../../custom/PermissionProvider';
import { PermissionShield } from '../../custom/permissions';

export interface MenuItemProps extends MuiMenuItemProps {
  /**
   * A single permission key, or a key set — `{ anyOf: [...] }` (any one key
   * suffices) or `{ allOf: [...] }` (every key required).
   */
  permissionKey?: PermissionKeySpec;
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

  // useHasPermission returns true when no permissionKey is provided (backward compatible)
  if (hasPermission) {
    return <MuiMenuItem {...rest} disabled={disabled} />;
  }

  // User LACKS permission → apply the permissionAction
  if (permissionAction === 'hide') {
    return <></>;
  }

  return (
    <PermissionShield permissionKey={permissionKey!} variant="inline">
      <MuiMenuItem {...rest} disabled={true} />
    </PermissionShield>
  );
}

export default MenuItem;
