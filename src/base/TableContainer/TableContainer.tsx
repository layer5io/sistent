import {
  TableContainer as MuiTableContainer,
  TableContainerProps as MuiTableContainerProps
} from '@mui/material';
import React from 'react';

export const TableContainer = React.forwardRef<HTMLDivElement, MuiTableContainerProps>(
  (props, ref) => {
    return <MuiTableContainer {...props} ref={ref} />;
  }
);

export default TableContainer;
