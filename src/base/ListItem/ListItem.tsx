import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from '@mui/material';
import React from 'react';
import { Key, PermissionShield } from '../../custom/permissions';

export interface ListItemProps extends MuiListItemProps {
  permissionKey?: Key;
  disabled?: boolean;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { permissionKey, disabled, ...rest } = props;

  // When disabled AND permissionKey is provided, show the shield overlay
  // Note: MUI ListItem doesn't have a native `disabled` prop, so we only use
  // it as a custom guard for the PermissionShield wrapper
  if (disabled && permissionKey) {
    return (
      <PermissionShield permissionKey={permissionKey} variant="inline">
        <MuiListItem {...rest} ref={ref} />
      </PermissionShield>
    );
  }

  return <MuiListItem {...rest} ref={ref} />;
});

ListItem.displayName = 'ListItem';

export default ListItem;
