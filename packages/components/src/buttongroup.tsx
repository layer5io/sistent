import { ButtonGroup as MuiButtonGroup, type ButtonGroupProps } from '@mui/material';
import React from 'react';

export const ButtonGroup = (props: ButtonGroupProps): JSX.Element => {
  return <MuiButtonGroup {...props} />;
};
