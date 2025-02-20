import { Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps } from '@mui/material';
import React from 'react';

export const Snackbar = React.forwardRef<HTMLDivElement, MuiSnackbarProps>((props, ref) => (
  <MuiSnackbar {...props} ref={ref} />
));

export default Snackbar;
