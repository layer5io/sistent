import { Dialog as MuiDialog, type DialogProps as MuiDialogProps } from '@mui/material';

export function Dialog(props: MuiDialogProps): JSX.Element {
  return <MuiDialog {...props} />;
}

export default Dialog;
