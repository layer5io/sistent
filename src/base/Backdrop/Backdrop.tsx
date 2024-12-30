import { Backdrop as MuiBackdrop, type BackdropProps as MuiBackdropProps } from '@mui/material';
import React from 'react';

const Backdrop = React.forwardRef<HTMLDivElement, MuiBackdropProps>((props, ref) => {
  return <MuiBackdrop {...props} ref={ref} />;
});

export default Backdrop;
