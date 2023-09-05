import { ToggleButton as MuiToggleButton, type ToggleButtonProps } from '@mui/material';
import React from 'react';

export function ToggleButton(props: ToggleButtonProps): JSX.Element {
  return <MuiToggleButton {...props} />;
}
