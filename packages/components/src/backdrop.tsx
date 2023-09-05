import { Backdrop as MuiBackdrop, type BackdropProps } from '@mui/material';
import React from 'react';

export function Backdrop(props: BackdropProps): JSX.Element {
  return <MuiBackdrop {...props} />;
}
