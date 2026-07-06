import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material';
import React from 'react';
import { Key, PermissionAction, usePermission, PermissionShield } from '../../custom/permissions';

export interface ListItemButtonProps extends MuiListItemButtonProps {
  permissionKey?: Key;
  permissionAction?: PermissionAction;
}

const ListItemButton = React.forwardRef<HTMLDivElement, ListItemButtonProps>((props, ref) => {
  const { permissionKey, permissionAction = 'disable', ...rest } = props;
  const { hasPermission, action } = usePermission({ permissionKey, permissionAction });

  if (!hasPermission) {
    switch (action) {
      case 'hide':
        return null;
      case 'showShield':
        return (
          <PermissionShield permissionKey={permissionKey!} variant="inline">
            <MuiListItemButton {...rest} ref={ref} disabled={true} sx={{ width: '100%', ...rest.sx }} />
          </PermissionShield>
        );
      case 'disable':
      default:
        return <MuiListItemButton {...rest} ref={ref} disabled={true} />;
    }
  }

  return <MuiListItemButton {...rest} ref={ref} />;
});

export { ListItemButton };
export default ListItemButton;
