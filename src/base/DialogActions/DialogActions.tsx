import {
  DialogActions as MuiDialogActions,
  type DialogActionsProps as MuiDialogActionsProps
} from '@mui/material';
import React from 'react';

const DialogActions = React.forwardRef<HTMLDivElement, MuiDialogActionsProps>((props, ref) => {
  return <MuiDialogActions {...props} ref={ref} />;
});

export default DialogActions;
