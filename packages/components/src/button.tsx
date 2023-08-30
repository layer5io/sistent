import { ButtonProps, Button as MuiButton } from '@mui/material';
import * as React from 'react';

export const BaseButton = (props: ButtonProps) => {
  return <MuiButton {...props} />;
};
