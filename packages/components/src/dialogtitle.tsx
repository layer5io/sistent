import { DialogTitle as MuiDialogTitle, type DialogTitleProps } from '@mui/material';
import React from 'react';

export function DialogTitle(props: DialogTitleProps): JSX.Element {
  return <MuiDialogTitle {...props} />;
}
