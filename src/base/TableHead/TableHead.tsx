import { TableHead as MuiTableHead, TableHeadProps as MuiTableHeadProps } from '@mui/material';
import React from 'react';

export const TableHead = React.forwardRef<HTMLTableSectionElement, MuiTableHeadProps>(
  function TableHead(props: MuiTableHeadProps, ref) {
    return <MuiTableHead ref={ref} {...props} />;
  }
);

export default TableHead;
