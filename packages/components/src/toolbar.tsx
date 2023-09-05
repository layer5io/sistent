import { Toolbar as MuiToolbar, type ToolbarProps } from '@mui/material';
import React from 'react';

export function Toolbar(props: ToolbarProps): JSX.Element {
  return <MuiToolbar {...props} />;
}
