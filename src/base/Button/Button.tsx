import { Button as MuiButton, type ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
  label?: string;
  children?: React.ReactNode;
  'data-testid'?: string;
}

export function Button({ label, children, ...props }: ButtonProps): JSX.Element {
  return (
    <MuiButton data-testid={props['data-testid']} {...props}>
      {label}
      {children}
    </MuiButton>
  );
}

export const ContainedButton = (props: ButtonProps): JSX.Element => (
  <Button variant="contained" data-testid={props['data-testid'] || 'contained-button'} {...props}>
    {props.children}
  </Button>
);
export const OutlinedButton = (props: ButtonProps): JSX.Element => (
  <Button variant="outlined" data-testid={props['data-testid'] || 'outlined-button'} {...props}>
    {props.children}
  </Button>
);
export const TextButton = (props: ButtonProps): JSX.Element => (
  <Button variant="text" data-testid={props['data-testid'] || 'text-button'} {...props}>
    {props.children}
  </Button>
);

export default Button;
