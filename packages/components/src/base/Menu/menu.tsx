import { Menu as MuiMenu, type MenuProps } from '@mui/material';

export function Menu(props: MenuProps): JSX.Element {
  return <MuiMenu {...props} />;
}
