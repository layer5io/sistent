import {
  RadioGroup as MuiRadioGroup,
  type RadioGroupProps as MuiRadioGroupProps
} from '@mui/material';
import React from 'react';

const RadioGroup = React.forwardRef<HTMLDivElement, MuiRadioGroupProps>((props, ref) => {
  return <MuiRadioGroup {...props} ref={ref} />;
});

export default RadioGroup;
