import { styled } from '@mui/material';
import { Button, Chip, Grid, Paper, Typography } from '../../../base';
import { KEPPEL } from '../../../theme';

export const StyledChip = styled(Chip)(({ theme }) => ({
  padding: '5px 6px !important',
  color: theme.palette.text.default,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  fontWeight: 400,
  height: 'unset',
  borderRadius: '100px',
  border: `0.5px solid ${theme.palette.border?.normal}`,
  background: theme.palette.background.default,
  maxWidth: '14.375rem'
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 280,
  overflow: 'auto',
  backgroundColor: theme.palette.background.secondary,
  borderRadius: '10px',
  boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25) inset',
  '@media (max-width: 843px)': {
    width: 260
  },
  '@media (max-width: 768px)': {
    width: 300
  },
  '@media (max-width: 375px)': {
    width: '100%'
  }
}));

export const ListHeading = styled(Typography)(({ theme }) => ({
  paddingBottom: '15px',
  color: theme.palette.text?.default,
  textAlign: 'center',
  fontSize: '1rem',
  letterSpacing: '0.15px'
}));

export const TransferButton = styled(Button)(({ theme }) => ({
  margin: '5px 0',
  padding: '7px 0',
  borderRadius: '10px',
  borderColor: theme.palette.border?.strong,
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'row',
  fill: theme.palette.icon.default,
  '&:hover': {
    borderColor: theme.palette.border?.brand,
    backgroundColor: `${KEPPEL} !important`,
    fill: theme.palette.icon.inverse
  }
}));

export const ListGrid = styled(Grid)({
  padding: '0 1rem',
  '@media (max-width: 768px)': {
    padding: '0',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%'
  }
});

export const ButtonGrid = styled(Grid)({
  padding: '2.5rem 1rem 0 1rem',
  '@media (max-width: 768px)': {
    padding: '1rem',
    transform: 'rotate(90deg)',
    height: '6.25rem',
    marginLeft: '6.25rem'
  }
});
