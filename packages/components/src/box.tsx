import { Box as MuiBox, type BoxProps } from '@mui/material';
import React from 'react';

export function Box(props: BoxProps): JSX.Element {
  return <MuiBox {...props} />;
}
