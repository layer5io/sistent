import { TextField as MuiTextField, type TextFieldProps as MuiTextFieldProps } from '@mui/material';

export function TextField(props: MuiTextFieldProps): JSX.Element {
  return <MuiTextField {...props} />;
}

export default TextField;
