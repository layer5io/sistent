import { Grid, GridProps } from '@mui/material';
import React from 'react';

const Grid2 = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  return <Grid {...props} ref={ref} />;
});

export { Grid2 };
