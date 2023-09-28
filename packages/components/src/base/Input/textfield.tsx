import { TextField as MuiTextField, type TextFieldProps } from '@mui/material';

export function TextField(props: TextFieldProps): JSX.Element {
  return <MuiTextField {...props} />;
}
