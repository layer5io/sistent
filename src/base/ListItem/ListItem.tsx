import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from '@mui/material';
import React from 'react';
import { Key, PermissionAction, usePermission, PermissionShield } from '../../custom/permissions';

export interface ListItemProps extends MuiListItemProps {
  permissionKey?: Key;
  permissionAction?: PermissionAction;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { permissionKey, permissionAction = 'disable', ...rest } = props;
  const { hasPermission, action } = usePermission({ permissionKey, permissionAction });

  if (!hasPermission) {
    switch (action) {
      case 'hide':
        return null;
      case 'showShield':
        return (
          <PermissionShield permissionKey={permissionKey!} variant="inline">
            <MuiListItem {...rest} ref={ref} sx={{ width: '100%', opacity: 0.5, pointerEvents: 'none', ...rest.sx }} />
          </PermissionShield>
        );
      case 'disable':
      default:
        return <MuiListItem {...rest} ref={ref} sx={{ opacity: 0.5, pointerEvents: 'none', ...rest.sx }} />;
    }
  }

  return <MuiListItem {...rest} ref={ref} />;
});

export default ListItem;
