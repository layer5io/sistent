import { Backdrop as MuiBackdrop, type BackdropProps } from '@mui/material';
import React from 'react';

export function Backdrop(props: BackdropProps) {
  return <MuiBackdrop {...props} />;
}
