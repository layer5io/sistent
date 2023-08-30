import { CheckboxProps, Checkbox as MuiCheckbox } from '@mui/material';
import React from 'react';

export function Checkbox(props: CheckboxProps) {
  return <MuiCheckbox {...props} />;
}
