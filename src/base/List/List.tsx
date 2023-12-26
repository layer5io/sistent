import { List as MuiList, ListProps as MuiListProps } from '@mui/material';

export function List(props: MuiListProps): JSX.Element {
  return <MuiList {...props} />;
}

export default List;
