import {
  FormControl as MuiFormControl,
  FormControlProps as MuiFormControlProps
} from '@mui/material';

export function FormControl(props: MuiFormControlProps): JSX.Element {
  return <MuiFormControl {...props} />;
}

export default FormControl;
