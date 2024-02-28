import { Menu as MuiMenu, MenuProps as MuiMenuProps } from '@mui/material';

export function Menu(props: MuiMenuProps): JSX.Element {
  return <MuiMenu {...props} />;
}

export default Menu;
