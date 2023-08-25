import { BoxProps, Box as MuiBox } from '@mui/material';
import React from 'react';

export function Box(props: BoxProps) {
  return <MuiBox {...props} />;
}
