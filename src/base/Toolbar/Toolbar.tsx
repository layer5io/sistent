import { Toolbar as MuiToolbar, type ToolbarProps as MuiToolbarProps } from '@mui/material';
import React from 'react';

const Toolbar = React.forwardRef<HTMLDivElement, MuiToolbarProps>((props, ref) => {
  return <MuiToolbar {...props} ref={ref} />;
});

export default Toolbar;
