import { Paper as MuiPaper, PaperProps } from '@mui/material';
import React from 'react';

export function Paper(props: PaperProps) {
  return <MuiPaper {...props}>{props.children}</MuiPaper>;
}
