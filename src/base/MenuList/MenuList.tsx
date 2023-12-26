import { MenuList as MuiMenuList, MenuListProps as MuiMenuListProps } from '@mui/material';

export function MenuList(props: MuiMenuListProps): JSX.Element {
  return <MuiMenuList {...props} />;
}

export default MenuList;
