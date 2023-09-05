import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  type ToggleButtonGroupProps
} from '@mui/material';
import React from 'react';

export function ToggleButtonGroup(props: ToggleButtonGroupProps): JSX.Element {
  return <MuiToggleButtonGroup {...props} />;
}
