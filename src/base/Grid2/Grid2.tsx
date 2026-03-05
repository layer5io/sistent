import MuiGrid, { Grid2Props as MuiGridProps } from '@mui/material/Grid2';
import React from 'react';

const Grid2 = React.forwardRef<HTMLDivElement, MuiGridProps>((props, ref) => {
  return <MuiGrid {...props} ref={ref} />;
});

export { Grid2 };
