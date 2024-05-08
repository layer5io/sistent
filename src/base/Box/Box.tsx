import { Box as MuiBox, type BoxProps as MuiBoxProps } from '@mui/material';

export function Box(props: MuiBoxProps): JSX.Element {
  return <MuiBox {...props} />;
}

export default Box;
