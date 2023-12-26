import {
  ToggleButton as MuiToggleButton,
  type ToggleButtonProps as MuiToggleButtonProps
} from '@mui/material';

export function ToggleButton(props: MuiToggleButtonProps): JSX.Element {
  return <MuiToggleButton {...props} />;
}

export default ToggleButton;
