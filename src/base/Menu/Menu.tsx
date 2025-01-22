import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material';
import React from 'react';

const Menu = React.forwardRef<HTMLDivElement, MuiMenuProps>((props, ref) => {
  return <MuiMenu {...props} ref={ref} />;
});

export default Menu;
