import { Backdrop as MuiBackdrop, type BackdropProps } from '@mui/material';

export function Backdrop(props: BackdropProps): JSX.Element {
  return <MuiBackdrop {...props} />;
}
