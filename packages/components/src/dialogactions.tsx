import { DialogActions as MuiDialogActions, type DialogActionsProps } from '@mui/material';
import React from 'react';

export function DialogActions(props: DialogActionsProps): JSX.Element {
  return <MuiDialogActions {...props} />;
}
