import { List as MuiList, type ListProps } from '@mui/material';

export function List(props: ListProps): JSX.Element {
  return <MuiList {...props} />;
}
