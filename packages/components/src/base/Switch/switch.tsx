import { Switch as MuiSwitch, type SwitchProps } from '@mui/material';
import React from 'react';

export const Switch = (props: SwitchProps) => {
  return <MuiSwitch {...props} />;
};
