import { RadioGroup as MuiRadioGroup, type RadioGroupProps } from '@mui/material';
import React from 'react';

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  return <MuiRadioGroup {...props} />;
}
