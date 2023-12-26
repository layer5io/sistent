import { Switch as MuiSwitch, type SwitchProps as MuiSwitchProps } from '@mui/material';

export function Switch(props: MuiSwitchProps): JSX.Element {
  return <MuiSwitch {...props} />;
}

export default Switch;
