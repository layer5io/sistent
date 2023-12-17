import React from 'react';
import { DialogActions } from '../../base/DialogActions';
import { DialogContent } from '../../base/DialogContent';
import { DialogContentText } from '../../base/DialogContentText';
import { StyledDialog, StyledDialogTitle } from '../Dialog';

interface ChartDialogProps {
  open: boolean;
  content: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
}

function StyledChartDialog({ open, content, title, actions }: ChartDialogProps): JSX.Element {
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

export default StyledChartDialog;
