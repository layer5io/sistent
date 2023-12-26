import { Container as MuiContainer, ContainerProps as MuiContainerProps } from '@mui/material';

export function Container(props: MuiContainerProps): JSX.Element {
  return <MuiContainer {...props} />;
}

export default Container;
