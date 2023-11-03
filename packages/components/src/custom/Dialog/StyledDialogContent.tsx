import { DialogContent } from '../../base/Dialog';

interface DialogContentProps {
  children: React.ReactNode;
}

function MesheryDialogContent({ children, ...props }: DialogContentProps): JSX.Element {
  return <DialogContent {...props}>{children}</DialogContent>;
}

export { MesheryDialogContent as StyledDialogContent };
