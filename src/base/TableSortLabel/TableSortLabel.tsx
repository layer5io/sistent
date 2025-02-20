import {
  TableSortLabel as MuiTableSortLabel,
  TableSortLabelProps as MuiTableSortLabelProps
} from '@mui/material';
import React from 'react';

export const TableSortLabel = React.forwardRef<HTMLSpanElement, MuiTableSortLabelProps>(
  (props, ref) => {
    return <MuiTableSortLabel {...props} ref={ref} />;
  }
);

export default TableSortLabel;
