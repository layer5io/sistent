import { InputAdornment as MuiInputAdornment, type InputAdornmentProps } from '@mui/material';

export function InputAdornment(props: InputAdornmentProps): JSX.Element {
  return <MuiInputAdornment {...props} />;
}
