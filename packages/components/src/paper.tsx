import { Paper as MuiPaper, type PaperProps } from '@mui/material';
import React from 'react';

export function Paper(props: PaperProps): JSX.Element {
  return <MuiPaper {...props}>{props.children}</MuiPaper>;
}
