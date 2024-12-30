import { Paper as MuiPaper, type PaperProps as MuiPaperProps } from '@mui/material';
import React from 'react';

const Paper = React.forwardRef<HTMLDivElement, MuiPaperProps>((props, ref) => {
  return <MuiPaper {...props} ref={ref} />;
});

export default Paper;
