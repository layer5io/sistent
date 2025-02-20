import { Fade as MuiFade, FadeProps as MuiFadeProps } from '@mui/material';
import React from 'react';

export const Fade = React.forwardRef<HTMLDivElement, MuiFadeProps>((props, ref) => {
  return <MuiFade ref={ref} {...props} />;
});

export default Fade;
