import {
  ButtonGroup as MuiButtonGroup,
  type ButtonGroupProps as MuiButtonGroupProps
} from '@mui/material';

export function ButtonGroup(props: MuiButtonGroupProps): JSX.Element {
  return <MuiButtonGroup {...props} />;
}

export default ButtonGroup;
