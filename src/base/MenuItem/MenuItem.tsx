import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material';
import React from 'react';
import { Key, PermissionShield } from '../../custom/permissions';

export interface MenuItemProps extends MuiMenuItemProps {
  permissionKey?: Key;
}

export function MenuItem(props: MenuItemProps): JSX.Element {
  const { permissionKey, disabled, ...rest } = props;

  // When disabled AND permissionKey is provided, show the shield overlay
  if (disabled && permissionKey) {
    return (
      <PermissionShield permissionKey={permissionKey} variant="inline">
        <MuiMenuItem {...rest} disabled={true} />
      </PermissionShield>
    );
  }

  return <MuiMenuItem {...rest} disabled={disabled} />;
}

export default MenuItem;
