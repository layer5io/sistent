import { Switch as MuiSwitch, type SwitchProps as MuiSwitchProps } from '@mui/material';
import React from 'react';

const Switch = React.forwardRef<HTMLButtonElement, MuiSwitchProps>((props, ref) => {
  return <MuiSwitch {...props} ref={ref} />;
});

export default Switch;
