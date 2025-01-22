import { Box as MuiBox, type BoxProps as MuiBoxProps } from '@mui/material';
import React from 'react';

const Box = React.forwardRef<HTMLDivElement, MuiBoxProps>((props, ref) => {
  return <MuiBox {...props} ref={ref} />;
});

export default Box;
