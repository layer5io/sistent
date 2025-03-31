import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';
import React from 'react';

/**
 * @deprecated This component is deprecated and will be removed in a future version.
 * Please use an alternative Grid2 component instead.
 */
const Grid = React.forwardRef<HTMLDivElement, MuiGridProps>((props, ref) => {
  return <MuiGrid {...props} ref={ref} />;
});

export { Grid };
