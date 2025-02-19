import {
  SpeedDial as MuiSpeedDial,
  SpeedDialAction as MuiSpeedDialAction,
  SpeedDialActionProps as MuiSpeedDialActionProps,
  SpeedDialProps as MuiSpeedDialProps
} from '@mui/material';
import React from 'react';

export const SpeedDial = React.forwardRef<HTMLDivElement, MuiSpeedDialProps>((props, ref) => (
  <MuiSpeedDial {...props} ref={ref} />
));

export const SpeedDialAction = React.forwardRef<HTMLButtonElement, MuiSpeedDialActionProps>(
  (props, ref) => <MuiSpeedDialAction {...props} ref={ref} />
);
