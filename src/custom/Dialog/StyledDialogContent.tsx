import React from 'react';
import { DialogContent } from '../../base/DialogContent';

interface StyledDialogContentProps {
  children: React.ReactNode;
}

export function StyledDialogContent({ children, ...props }: StyledDialogContentProps): JSX.Element {
  return <DialogContent {...props}>{children}</DialogContent>;
}

export default StyledDialogContent;
