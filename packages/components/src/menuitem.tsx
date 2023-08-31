import { MenuItemProps, MenuItem as MuiMenuItem } from '@mui/material';
import React from 'react';

export const MenuItem = (props: MenuItemProps) => {
  return <MuiMenuItem {...props} />;
};
