import { Backdrop as MuiBackdrop, type BackdropProps as MuiBackdropProps } from '@mui/material';

export function Backdrop(props: MuiBackdropProps): JSX.Element {
  return <MuiBackdrop {...props} />;
}

export default Backdrop;
