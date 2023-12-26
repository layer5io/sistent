import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps as MuiCircularProgressProps
} from '@mui/material';

export function CircularProgress(props: MuiCircularProgressProps): JSX.Element {
  return <MuiCircularProgress {...props} />;
}

export default CircularProgress;
