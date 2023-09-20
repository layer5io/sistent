import { FC, ReactNode } from 'react';
import { DialogContent } from '../../base/Dialog';

interface DialogContentProps {
  children: ReactNode;
}

const MesheryDialogContent: FC<DialogContentProps> = ({ children, ...props }) => {
  return <DialogContent {...props}>{children}</DialogContent>;
};

export { MesheryDialogContent as StyledDialogContent };
