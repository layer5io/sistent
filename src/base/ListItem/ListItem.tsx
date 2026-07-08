import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from '@mui/material';
import React from 'react';
import { Key, PermissionShield } from '../../custom/permissions';

export interface ListItemProps extends MuiListItemProps {
  permissionKey?: Key;
}

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>((props, ref) => {
  const { permissionKey, ...rest } = props;

  // ListItem doesn't have a native `disabled` prop, so check via sx/style or a custom flag
  // For now, if permissionKey is provided, show the shield (consumer controls when to pass it)
  if (permissionKey) {
    return (
      <PermissionShield permissionKey={permissionKey} variant="inline">
        <MuiListItem {...rest} ref={ref} />
      </PermissionShield>
    );
  }

  return <MuiListItem {...rest} ref={ref} />;
});

export default ListItem;
