import { Drawer as MuiDrawer, type DrawerProps as MuiDrawerProps } from '@mui/material';
import React from 'react';

const Drawer = React.forwardRef<HTMLDivElement, MuiDrawerProps>((props, ref) => {
  return <MuiDrawer {...props} ref={ref} />;
});

export default Drawer;
