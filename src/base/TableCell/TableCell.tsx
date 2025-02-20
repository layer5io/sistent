import { TableCell as MuiTableCell, TableCellProps as MuiTableCellProps } from '@mui/material';
import React from 'react';

export const TableCell = React.forwardRef<HTMLTableCellElement, MuiTableCellProps>((props, ref) => {
  return <MuiTableCell {...props} ref={ref} />;
});

export default TableCell;
