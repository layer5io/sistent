import { type DialogProps } from '@mui/material';
import { Dialog } from '../../base/Dialog';
import { DialogTitle } from '../../base/DialogTitle';

type StyledDialogProps = {
  open: boolean;
  fullScreen?: boolean;
  title?: string;
} & Omit<DialogProps, 'fullScreen'>;

function StyledDialog({
  open,
  onClose,
  children,
  title,
  ...props
}: StyledDialogProps): JSX.Element {
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
}

export default StyledDialog;
