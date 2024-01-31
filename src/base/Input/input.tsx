import { Input as MuiInput, type InputProps } from '@mui/material';

export function Input(props: InputProps): JSX.Element {
  return <MuiInput {...props} />;
}
