import { Fab as MuiFab, FabProps as MuiFabProps } from '@mui/material';
import React from 'react';

export const Fab = React.forwardRef<HTMLButtonElement, MuiFabProps>((props, ref) => (
  <MuiFab {...props} ref={ref} />
));

export default Fab;
