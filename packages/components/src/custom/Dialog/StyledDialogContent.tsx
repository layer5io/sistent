import React from 'react';
import { DialogContent } from '../../base/Dialog';

interface DialogContentProps {
  children: React.ReactNode;
}

function StyledDialogContent({ children, ...props }: DialogContentProps): JSX.Element {
  return <DialogContent {...props}>{children}</DialogContent>;
}

export default StyledDialogContent;
