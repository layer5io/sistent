import { Popper as MuiPopper, type PopperProps } from '@mui/material';

export function Popper(props: PopperProps): JSX.Element {
  return <MuiPopper {...props} />;
}
