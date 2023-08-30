import React from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps } from '@mui/material';

export function Checkbox(props: CheckboxProps) {
  return <MuiCheckbox {...props} />;
}
