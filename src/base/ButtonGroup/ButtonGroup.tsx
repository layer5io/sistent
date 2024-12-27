import {
  ButtonGroup as MuiButtonGroup,
  type ButtonGroupProps as MuiButtonGroupProps
} from '@mui/material';
import React from 'react';

const ButtonGroup = React.forwardRef<HTMLDivElement, MuiButtonGroupProps>((props, ref) => {
  return <MuiButtonGroup {...props} ref={ref} />;
});

export default ButtonGroup;
