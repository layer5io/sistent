import { Switch as MuiSwitch, type SwitchProps } from '@mui/material';

export function Switch(props: SwitchProps): JSX.Element {
  return <MuiSwitch {...props} />;
}
