import { Stack as MuiStack, type StackProps as MuiStackProps } from '@mui/material';
import React from 'react';

const Stack = React.forwardRef<HTMLDivElement, MuiStackProps>((props, ref) => {
  return <MuiStack {...props} ref={ref} />;
});

export default Stack;
