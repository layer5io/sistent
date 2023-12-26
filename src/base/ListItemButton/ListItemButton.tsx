import {
  ListItemButton as MuiListItemButton,
  ListItemButtonProps as MuiListItemButtonProps
} from '@mui/material';

export function ListItemButton(props: MuiListItemButtonProps): JSX.Element {
  return <MuiListItemButton {...props} />;
}

export default ListItemButton;
