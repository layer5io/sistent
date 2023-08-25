import { DialogProps, Dialog as MuiDialog } from '@mui/material';
import React from 'react';

export function Dialog(props: DialogProps) {
  return <MuiDialog {...props} />;
}
