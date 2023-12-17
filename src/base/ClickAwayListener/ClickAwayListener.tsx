import {
  ClickAwayListener as MuiClickAwayListener,
  type ClickAwayListenerProps
} from '@mui/material';

export function ClickAwayListener(props: ClickAwayListenerProps): JSX.Element {
  return <MuiClickAwayListener {...props} />;
}

export default ClickAwayListener;
