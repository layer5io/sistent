import { Switch as MuiSwitch, type SwitchProps as MuiSwitchProps } from '@mui/material';
import React from 'react';

interface ExtendedSwitchProps extends MuiSwitchProps {
  'data-testid'?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, ExtendedSwitchProps>((props, ref) => {
  return <MuiSwitch {...props} ref={ref} />;
});

export default Switch;
