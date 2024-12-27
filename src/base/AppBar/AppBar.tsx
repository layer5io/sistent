import { AppBar as MuiAppBar, type AppBarProps as MuiAppBarProps } from '@mui/material';
import React from 'react';

const AppBar = React.forwardRef<HTMLDivElement, MuiAppBarProps>((props, ref) => {
  return <MuiAppBar {...props} ref={ref} />;
});

export default AppBar;
