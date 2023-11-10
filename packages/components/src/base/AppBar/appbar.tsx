import { AppBar as MuiAppBar, type AppBarProps } from '@mui/material';

export function AppBar(props: AppBarProps): JSX.Element {
  return <MuiAppBar {...props} />;
}
