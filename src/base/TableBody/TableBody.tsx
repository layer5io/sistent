import { TableBody as MuiTableBody, TableBodyProps as MuiTableBodyProps } from '@mui/material';
import React from 'react';

export const TableBody = React.forwardRef<HTMLTableSectionElement, MuiTableBodyProps>(
  (props, ref) => <MuiTableBody {...props} ref={ref} />
);

export default TableBody;
