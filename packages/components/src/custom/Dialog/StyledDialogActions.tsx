import React from 'react';
import { DialogActions } from '../../base/Dialog';

interface DialogActionsProps {
  children: React.ReactNode;
}

function StyledDialogActions({ children, ...props }: DialogActionsProps): JSX.Element {
  return <DialogActions {...props}>{children}</DialogActions>;
}

export default StyledDialogActions;
