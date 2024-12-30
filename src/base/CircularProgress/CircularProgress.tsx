import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps
} from '@mui/material';
import React from 'react';

const CircularProgress = React.forwardRef<HTMLDivElement, MuiCircularProgressProps>(
  (props, ref) => {
    return <MuiCircularProgress {...props} ref={ref} />;
  }
);

export default CircularProgress;
