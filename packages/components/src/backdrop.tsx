import React from 'react';
import { Backdrop as MuiBackdrop, BackdropProps } from '@mui/material';

export function Backdrop(props: BackdropProps) {
  return <MuiBackdrop {...props} />;
}
