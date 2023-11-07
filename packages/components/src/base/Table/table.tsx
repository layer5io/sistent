import { Table as MuiTable, type TableProps } from '@mui/material';

export function Table(props: TableProps): JSX.Element {
  return <MuiTable {...props} />;
}
