import { Select as MuiSelect, type SelectProps } from '@mui/material';

export function Select(props: SelectProps): JSX.Element {
  return <MuiSelect {...props} />;
}
