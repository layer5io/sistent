import {
  DialogContentText as MuiDialogContentText,
  type DialogContentTextProps as MuiDialogContentTextProps
} from '@mui/material';
import React from 'react';

const DialogContentText = React.forwardRef<HTMLDivElement, MuiDialogContentTextProps>(
  (props, ref) => {
    return <MuiDialogContentText {...props} ref={ref} />;
  }
);

export default DialogContentText;
