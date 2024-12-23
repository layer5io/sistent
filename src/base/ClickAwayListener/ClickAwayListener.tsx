import {
  ClickAwayListener as MuiClickAwayListener,
  type ClickAwayListenerProps
} from '@mui/material';
import React from 'react';

const ClickAwayListener = React.forwardRef<HTMLDivElement, ClickAwayListenerProps>((props, ref) => {
  return <MuiClickAwayListener {...props} ref={ref} />;
});

export default ClickAwayListener;
