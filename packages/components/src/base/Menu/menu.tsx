import { Menu as MuiMenu, type MenuProps } from '@mui/material';
import React from 'react';

export function Menu(props: MenuProps) {
  return <MuiMenu {...props} />;
}
