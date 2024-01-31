import { Select as MuiSelect, type SelectProps as MuiSelectProps } from '@mui/material';

export function Select(props: MuiSelectProps): JSX.Element {
  return <MuiSelect {...props} />;
}

export default Select;
