import type { GridProps as MuiGridProps } from '@mui/material/Grid';
import MuiGrid from '@mui/material/Grid';
import React from 'react';

const Grid2 = React.forwardRef<HTMLDivElement, MuiGridProps>((props, ref) => {
  return <MuiGrid {...props} ref={ref} />;
});

export { Grid2 };
