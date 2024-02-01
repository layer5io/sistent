import {
  DialogActions as MuiDialogActions,
  type DialogActionsProps as MuiDialogActionsProps
} from '@mui/material';

export function DialogActions(props: MuiDialogActionsProps): JSX.Element {
  return <MuiDialogActions {...props} />;
}

export default DialogActions;
