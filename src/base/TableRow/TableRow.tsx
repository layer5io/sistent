import { TableRow as MuiTableRow, TableRowProps as MuiTableRowProps } from '@mui/material';
import React from 'react';

export const TableRow = React.forwardRef<HTMLTableRowElement, MuiTableRowProps>((props, ref) => {
  return <MuiTableRow ref={ref} {...props} />;
});

export default TableRow;
