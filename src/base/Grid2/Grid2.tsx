import { Grid2 as MuiGrid, Grid2Props as MuiGridProps } from '@mui/material';
import React from 'react';

const Grid2 = React.forwardRef<HTMLDivElement, MuiGridProps>((props, ref) => {
  return <MuiGrid {...props} ref={ref} />;
});

export { Grid2 };
