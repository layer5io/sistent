import { Grid2 as MuiGrid } from '@mui/material';
import React from 'react';

type MuiGridProps = React.ComponentProps<typeof MuiGrid>;

const Grid2 = React.forwardRef<HTMLDivElement, MuiGridProps>((props, ref) => {
  return <MuiGrid {...props} ref={ref} />;
});

export { Grid2 };
