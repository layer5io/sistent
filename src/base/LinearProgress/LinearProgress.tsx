import {
  LinearProgress as MuiLinearProgress,
  LinearProgressProps as MuiLinearProgressProps
} from '@mui/material';
import React from 'react';

export const LinearProgress: React.FC<MuiLinearProgressProps> = (props) => (
  <MuiLinearProgress {...props} />
);

export default LinearProgress;
