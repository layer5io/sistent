import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';
import React from 'react';

const Grid = React.forwardRef<HTMLDivElement, MuiGridProps>((props, ref) => {
  return <MuiGrid {...props} ref={ref} />;
});

export { Grid };
