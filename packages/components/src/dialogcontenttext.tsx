import {
  DialogContentText as MuiDialogContentText,
  type DialogContentTextProps
} from '@mui/material';
import React from 'react';

export function DialogContentText(props: DialogContentTextProps): JSX.Element {
  return <MuiDialogContentText {...props} />;
}
