import { FC, ReactNode } from 'react';
import { DialogActions, DialogContent, DialogContentText } from '../base/Dialog';
import { StyledDialog, StyledDialogTitle } from './Dialog';

interface MesheryChartDialogProps {
  open: boolean;
  content: ReactNode;
  title: string;
  actions?: ReactNode;
}

const MesheryChartDialog: FC<MesheryChartDialogProps> = ({ open, content, title, actions }) => {
  return (
    <StyledDialog fullWidth maxWidth="md" open={open}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </StyledDialog>
  );
};

export { MesheryChartDialog as StyledChartDialog };
