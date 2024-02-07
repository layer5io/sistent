import { Pagination as MuiPagination, PaginationProps as MuiPaginationProps } from '@mui/material';

export function Pagination(props: MuiPaginationProps): JSX.Element {
  return <MuiPagination {...props} />;
}

export default Pagination;
