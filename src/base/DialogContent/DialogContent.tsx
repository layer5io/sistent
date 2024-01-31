import {
  DialogContent as MuiDialogContent,
  type DialogContentProps as MuiDialogContentProps
} from '@mui/material';

export function DialogContent(props: MuiDialogContentProps): JSX.Element {
  return <MuiDialogContent {...props} />;
}

export default DialogContent;
