import { DialogActions } from '../../base/Dialog';

interface DialogActionsProps {
  children: React.ReactNode;
}

function MesheryDialogActions({ children, ...props }: DialogActionsProps): JSX.Element {
  return <DialogActions {...props}>{children}</DialogActions>;
}

export { MesheryDialogActions as StyledDialogActions };
