import { Hidden as MuiHidden, HiddenProps as MuiHiddenProps } from '@mui/material';
import React from 'react';

export const Hidden = React.forwardRef<HTMLDivElement, MuiHiddenProps>((props) => {
  // MuiHidden doesn't support ref forwarding
  return <MuiHidden {...props} />;
});

export default Hidden;
