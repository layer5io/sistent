import { MenuItem as MuiMenuItem, type MenuItemProps } from '@mui/material';

export function MenuItem(props: MenuItemProps): JSX.Element {
  return <MuiMenuItem {...props} />;
}
