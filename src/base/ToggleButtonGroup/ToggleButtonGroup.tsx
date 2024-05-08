import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  type ToggleButtonGroupProps as MuiToggleButtonGroupProps
} from '@mui/material';

export function ToggleButtonGroup(props: MuiToggleButtonGroupProps): JSX.Element {
  return <MuiToggleButtonGroup {...props} />;
}

export default ToggleButtonGroup;
