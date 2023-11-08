import { Box as MuiBox, type BoxProps } from '@mui/material';

export function Box(props: BoxProps): JSX.Element {
  return <MuiBox {...props} />;
}
