import * as React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

export const BaseButton = (props: ButtonProps) => {
  return <MuiButton {...props} />;
};
