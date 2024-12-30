import { Pagination as MuiPagination, PaginationProps as MuiPaginationProps } from '@mui/material';
import React from 'react';

const Pagination = React.forwardRef<HTMLDivElement, MuiPaginationProps>((props, ref) => {
  return <MuiPagination {...props} ref={ref} />;
});

export default Pagination;
