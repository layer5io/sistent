import { Paper, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledTableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflowX: 'auto',
  overflowY: 'hidden',
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`
}));

export const StyledHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900]
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  borderColor: theme.palette.divider,
  fontWeight: 500
}));

export const FeatureHeaderCell = styled(StyledTableCell)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  color: theme.palette.text.primary
}));
