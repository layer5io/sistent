import { Table as MuiTable, type TableProps } from '@mui/material';
import React from 'react';

export const Table = (props: TableProps): JSX.Element => {
  return <MuiTable {...props} />;
};
