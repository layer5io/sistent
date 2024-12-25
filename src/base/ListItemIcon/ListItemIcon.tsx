import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps as MuiListItemIconProps
} from '@mui/material';
import React from 'react';

const ListItemIcon = React.forwardRef<HTMLDivElement, MuiListItemIconProps>((props, ref) => {
  return <MuiListItemIcon {...props} ref={ref} />;
});

export default ListItemIcon;
