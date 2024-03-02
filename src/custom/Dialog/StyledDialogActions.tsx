import React from 'react';
import { DialogActions } from '../../base/DialogActions';

interface StyledDialogActionsProps {
  children: React.ReactNode;
}

export function StyledDialogActions({ children, ...props }: StyledDialogActionsProps): JSX.Element {
  return <DialogActions {...props}>{children}</DialogActions>;
}

export default StyledDialogActions;
