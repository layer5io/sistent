import { DialogActions, DialogContent, DialogContentText } from '../base/Dialog';
import { StyledDialog, StyledDialogTitle } from './Dialog';

interface MesheryChartDialogProps {
  open: boolean;
  content: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

function MesheryChartDialog({
  open,
  content,
  title,
  actions
}: MesheryChartDialogProps): JSX.Element {
  return (
    <StyledDialog fullWidth maxWidth="md" open={open}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </StyledDialog>
  );
}

export { MesheryChartDialog as StyledChartDialog };
