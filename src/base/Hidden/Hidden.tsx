import { Hidden as MuiHidden, HiddenProps as MuiHiddenProps } from '@mui/material';
import React from 'react';

export const Hidden = React.forwardRef<HTMLDivElement, MuiHiddenProps>((props, ref) => {
  return (
    <div ref={ref}>
      <MuiHidden {...props} />
    </div>
  );
});

export default Hidden;
