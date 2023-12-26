import { AppBar as MuiAppBar, type AppBarProps as MuiAppBarProps } from '@mui/material';

export function AppBar(props: MuiAppBarProps): JSX.Element {
  return <MuiAppBar {...props} />;
}

export default AppBar;
