import { Grow as MuiGrow, GrowProps as MuiGrowProps } from '@mui/material';
import React from 'react';

const Grow = React.forwardRef<HTMLDivElement, MuiGrowProps>((props, ref) => {
  return <MuiGrow {...props} ref={ref} />;
});

export { Grow };
