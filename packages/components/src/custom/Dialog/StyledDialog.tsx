import { type DialogProps as MuiDialogProps } from '@mui/material';
import { FC } from 'react';
import { Dialog, DialogTitle } from '../../base/Dialog';

type DialogProps = {
  open: boolean;
  fullScreen?: boolean;
  title?: string;
} & Omit<MuiDialogProps, 'fullScreen'>;

const MesheryDialog: FC<DialogProps> = ({ open, onClose, children, title, ...props }) => {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px',
          backgroundColor: 'white'
        }
      }}
      open={open}
      onClose={onClose}
      {...props}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      {children}
    </Dialog>
  );
};

export { MesheryDialog as StyledDialog };
