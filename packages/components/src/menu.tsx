import { Menu as MuiMenu, type MenuProps } from '@mui/material';
import React from 'react';

export const Menu = (props: MenuProps): JSX.Element => {
  return <MuiMenu {...props} />;
};
