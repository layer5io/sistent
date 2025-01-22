import { Popper as MuiPopper, type PopperProps as MuiPopperProps } from '@mui/material';
import React from 'react';

const Popper = React.forwardRef<HTMLDivElement, MuiPopperProps>((props, ref) => {
  return <MuiPopper {...props} ref={ref} />;
});

export default Popper;
