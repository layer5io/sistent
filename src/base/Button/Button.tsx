import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  children?: React.ReactNode;
}

export function Button({ label, children, ...props }: ButtonProps): JSX.Element {
  return (
    <MuiButton {...props}>
      {label}
      {children}
    </MuiButton>
  );
}

export const ContainedButton = (props: ButtonProps): JSX.Element => (
  <Button variant="contained" {...props}>
    {props.children}
  </Button>
);
export const OutlinedButton = (props: ButtonProps): JSX.Element => (
  <Button variant="outlined" {...props}>
    {props.children}
  </Button>
);
export const TextButton = (props: ButtonProps): JSX.Element => (
  <Button variant="text" {...props}>
    {props.children}
  </Button>
);

export default Button;
