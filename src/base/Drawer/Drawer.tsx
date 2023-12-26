import { Drawer as MuiDrawer, type DrawerProps as MuiDrawerProps } from '@mui/material';

export function Drawer(props: MuiDrawerProps): JSX.Element {
  return <MuiDrawer {...props} />;
}

export default Drawer;
