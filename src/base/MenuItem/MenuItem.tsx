import { MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps } from '@mui/material';

export function MenuItem(props: MuiMenuItemProps): JSX.Element {
  return <MuiMenuItem {...props} />;
}

export default MenuItem;
