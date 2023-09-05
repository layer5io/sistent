import { Stack as MuiStack, type StackProps } from '@mui/material';
import React from 'react';

export function Stack(props: StackProps): JSX.Element {
  return <MuiStack {...props} />;
}
