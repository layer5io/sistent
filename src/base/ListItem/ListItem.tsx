import { ListItem as MuiListItem, ListItemProps as MuiListItemProps } from '@mui/material';

export function ListItem(props: MuiListItemProps): JSX.Element {
  return <MuiListItem {...props} />;
}

export default ListItem;
