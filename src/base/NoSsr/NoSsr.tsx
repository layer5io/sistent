import { NoSsr as MuiNoSsr, NoSsrProps as MuiNoSsrProps } from '@mui/material';

export function NoSsr(props: MuiNoSsrProps): JSX.Element {
  return <MuiNoSsr {...props} />;
}

export default NoSsr;
