import {
  DialogContent as MuiDialogContent,
  type DialogContentProps as MuiDialogContentProps
} from '@mui/material';
import React from 'react';

const DialogContent = React.forwardRef<HTMLDivElement, MuiDialogContentProps>((props, ref) => {
  return <MuiDialogContent {...props} ref={ref} />;
});

export default DialogContent;
