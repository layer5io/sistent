import { BackdropProps, Backdrop as MuiBackdrop } from '@mui/material';
import React from 'react';

export function Backdrop(props: BackdropProps) {
  return <MuiBackdrop {...props} />;
}
