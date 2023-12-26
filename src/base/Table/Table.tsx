import { Table as MuiTable, type TableProps as MuiTableProps } from '@mui/material';

export function Table(props: MuiTableProps): JSX.Element {
  return <MuiTable {...props} />;
}

export default Table;
