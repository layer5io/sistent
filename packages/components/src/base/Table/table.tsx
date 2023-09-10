import { Table as MuiTable, type TableProps } from '@mui/material';
import React from 'react';

export const Table = (props: TableProps) => {
  return <MuiTable {...props} />;
};
