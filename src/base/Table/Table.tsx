import { Table as MuiTable, type TableProps as MuiTableProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface TableProps extends MuiTableProps {
  children?: React.ReactNode;
}

export function Table(props: TableProps): JSX.Element {
  return <MuiTable {...props} />;
}

const BorderedTableStyled = styled(MuiTable)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: '0',
  border: `1px solid ${theme.palette.divider}`,
  '& .MuiTableCell-root': {
    borderRight: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      borderRight: 'none'
    }
  }
}));

const StripedTableStyled = styled(MuiTable)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: '0',
  '& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover
  }
}));

const CompactTableStyled = styled(MuiTable)(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: '0',
  '& .MuiTableCell-root': {
    padding: theme.spacing(0.5, 1)
  }
}));

export const BorderedTable = (props: TableProps): JSX.Element => (
  <BorderedTableStyled {...props}>{props.children}</BorderedTableStyled>
);

export const StripedTable = (props: TableProps): JSX.Element => (
  <StripedTableStyled {...props}>{props.children}</StripedTableStyled>
);

export const CompactTable = (props: TableProps): JSX.Element => (
  <CompactTableStyled {...props}>{props.children}</CompactTableStyled>
);

export default Table;
