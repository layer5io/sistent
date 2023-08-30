import { AppBarProps, AppBar as MuiAppBar } from '@mui/material';
import React from 'react';

export function AppBar(props: AppBarProps) {
  return <MuiAppBar {...props} />;
}
