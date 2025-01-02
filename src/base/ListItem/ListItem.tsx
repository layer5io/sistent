import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from '@mui/material';
import React from 'react';

const ListItem = React.forwardRef<HTMLLIElement, MuiListItemProps>((props, ref) => {
  return <MuiListItem {...props} ref={ref} />;
});

export default ListItem;
