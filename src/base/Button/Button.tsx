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

export default Button;
