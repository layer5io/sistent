import { Checkbox as MuiCheckbox, type CheckboxProps } from '@mui/material';

export function Checkbox(props: CheckboxProps): JSX.Element {
  return <MuiCheckbox {...props} />;
}

export default Checkbox;
