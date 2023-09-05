import { Button as MuiButton, type ButtonProps } from '@mui/material';
import * as React from 'react';

export const BaseButton = (props: ButtonProps): JSX.Element => {
  return <MuiButton {...props} />;
};
