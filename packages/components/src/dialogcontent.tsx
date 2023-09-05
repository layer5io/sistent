import { DialogContent as MuiDialogContent, type DialogContentProps } from '@mui/material';
import React from 'react';

export function DialogContent(props: DialogContentProps): JSX.Element {
  return <MuiDialogContent {...props} />;
}
