import { Dialog as MuiDialog, type DialogProps as MuiDialogProps } from '@mui/material';
import React from 'react';

const Dialog = React.forwardRef<HTMLDivElement, MuiDialogProps>((props, ref) => {
  return <MuiDialog {...props} ref={ref} />;
});

export default Dialog;
