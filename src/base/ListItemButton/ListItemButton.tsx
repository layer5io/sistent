import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material';
import React from 'react';
import { Key, PermissionShield } from '../../custom/permissions';

export interface ListItemButtonProps extends MuiListItemButtonProps {
  permissionKey?: Key;
}

const ListItemButton = React.forwardRef<HTMLDivElement, ListItemButtonProps>((props, ref) => {
  const { permissionKey, disabled, ...rest } = props;

  // When disabled AND permissionKey is provided, show the shield overlay
  if (disabled && permissionKey) {
    return (
      <PermissionShield permissionKey={permissionKey} variant="inline">
        <MuiListItemButton {...rest} ref={ref} disabled={true} />
      </PermissionShield>
    );
  }

  return <MuiListItemButton {...rest} ref={ref} disabled={disabled} />;
});

export { ListItemButton };
export default ListItemButton;
