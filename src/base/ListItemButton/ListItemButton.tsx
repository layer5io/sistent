import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material';
import React from 'react';

const ListItemButton = React.forwardRef<HTMLDivElement, MuiListItemButtonProps>((props, ref) => {
  return <MuiListItemButton {...props} ref={ref} />;
});

export { ListItemButton };
