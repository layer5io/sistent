import {
  Pagination as MuiPagination,
  PaginationItem as MuiPaginationItem,
  PaginationProps as MuiPaginationProps
} from '@mui/material';
import React from 'react';

const Pagination = React.forwardRef<HTMLDivElement, MuiPaginationProps>((props, ref) => {
  return <MuiPagination {...props} ref={ref} />;
});

export { MuiPaginationItem as PaginationItem };
export default Pagination;
