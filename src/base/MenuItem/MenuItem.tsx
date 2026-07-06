import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material';
import React from 'react';
import { Key, PermissionAction, usePermission, PermissionShield } from '../../custom/permissions';

export interface MenuItemProps extends MuiMenuItemProps {
  permissionKey?: Key;
  permissionAction?: PermissionAction;
}

export function MenuItem(props: MenuItemProps): JSX.Element | null {
  const { permissionKey, permissionAction = 'disable', ...rest } = props;
  const { hasPermission, action } = usePermission({ permissionKey, permissionAction });

  if (!hasPermission) {
    switch (action) {
      case 'hide':
        return null;
      case 'showShield':
        return (
          <PermissionShield permissionKey={permissionKey!} variant="inline">
            <MuiMenuItem {...rest} disabled={true} sx={{ width: '100%', ...rest.sx }} />
          </PermissionShield>
        );
      case 'disable':
      default:
        return <MuiMenuItem {...rest} disabled={true} />;
    }
  }

  return <MuiMenuItem {...rest} />;
}

export default MenuItem;
