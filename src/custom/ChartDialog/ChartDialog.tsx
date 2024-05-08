import React from 'react';
import { Dialog } from '../../base';
import { DialogActions } from '../../base/DialogActions';
import { DialogContent } from '../../base/DialogContent';
import { DialogContentText } from '../../base/DialogContentText';
import { StyledDialogTitle } from '../Dialog';

interface ChartDialogProps {
  open: boolean;
  content: React.ReactNode;
  title: string;
  actions?: React.ReactNode;
  onClose: () => void;
}

function StyledChartDialog({
  open,
  content,
  title,
  actions,
  onClose
}: ChartDialogProps): JSX.Element {
  return (
    <Dialog open={open} onClose={onClose}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}

export default StyledChartDialog;
