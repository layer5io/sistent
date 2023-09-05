import { IconButton as MuiIconButton, type IconButtonProps } from '@mui/material';
import React from 'react';

export function IconButton(props: IconButtonProps): JSX.Element {
  return <MuiIconButton {...props} />;
}
