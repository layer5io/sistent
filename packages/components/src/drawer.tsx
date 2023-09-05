import { Drawer as MuiDrawer, type DrawerProps } from '@mui/material';
import React from 'react';

export function Drawer(props: DrawerProps): JSX.Element {
  return <MuiDrawer {...props} />;
}
