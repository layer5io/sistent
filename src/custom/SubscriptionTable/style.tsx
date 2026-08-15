import { Paper, TableCell, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';

// Custom Styled Container aligned with Sistent Theme
export const StyledTableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[2],
  border: `1px solid ${theme.palette.divider}`
}));

// Custom Styled Header Row
export const StyledHeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#f9fafb' : '#1e1e1e'
}));

// Custom Styled Table Cell for Typography token enforcement
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Open Sans, sans-serif',
  borderColor: theme.palette.divider,
  fontWeight: 500
}));

// Feature Name Column styling (High Emphasis)
export const FeatureHeaderCell = styled(StyledTableCell)(() => ({
  fontFamily: 'Qanelas Soft, sans-serif',
  fontWeight: 700,
  color: 'text.primary'
}));
