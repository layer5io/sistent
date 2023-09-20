import { FC, ReactNode } from 'react';
import { DialogActions } from '../../base/Dialog';

interface DialogActionsProps {
  children: ReactNode;
}

const MesheryDialogActions: FC<DialogActionsProps> = ({ children, ...props }) => {
  return <DialogActions {...props}>{children}</DialogActions>;
};

export { MesheryDialogActions as StyledDialogActions };
