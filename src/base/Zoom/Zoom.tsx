import { Zoom as MuiZoom, ZoomProps as MuiZoomProps } from '@mui/material';
import React from 'react';

export const Zoom = React.forwardRef<HTMLDivElement, MuiZoomProps>((props, ref) => {
  return <MuiZoom ref={ref} {...props} />;
});

export default Zoom;
