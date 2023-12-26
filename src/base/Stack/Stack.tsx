import { Stack as MuiStack, type StackProps as MuiStackProps } from '@mui/material';

export function Stack(props: MuiStackProps): JSX.Element {
  return <MuiStack {...props} />;
}

export default Stack;
