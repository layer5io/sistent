import {
  RadioGroup as MuiRadioGroup,
  type RadioGroupProps as MuiRadioGroupProps
} from '@mui/material';

export function RadioGroup(props: MuiRadioGroupProps): JSX.Element {
  return <MuiRadioGroup {...props} />;
}

export default RadioGroup;
