import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  type ToggleButtonGroupProps as MuiToggleButtonGroupProps
} from '@mui/material';
import React from 'react';

const ToggleButtonGroup = React.forwardRef<HTMLDivElement, MuiToggleButtonGroupProps>(
  (props, ref) => {
    return <MuiToggleButtonGroup {...props} ref={ref} />;
  }
);

export default ToggleButtonGroup;
