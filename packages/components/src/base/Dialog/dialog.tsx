import { Dialog as MuiDialog, type DialogProps } from '@mui/material';
import React from 'react';

export function Dialog(props: DialogProps) {
  return <MuiDialog {...props} />;
}
