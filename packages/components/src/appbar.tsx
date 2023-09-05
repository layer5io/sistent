import { AppBar as MuiAppBar, type AppBarProps } from '@mui/material';
import React from 'react';

export function AppBar(props: AppBarProps): JSX.Element {
  return <MuiAppBar {...props} />;
}
