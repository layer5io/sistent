import { styled } from '@mui/material';
import { Button, Chip, Grid, Paper, Typography } from '../../../base';
import { ALICE_BLUE, BLACK, DARK_TEAL, KEPPEL, WHITE, accentGrey } from '../../../theme';
import { STEEL_GRAY } from '../../../theme/colors/colors';

export const StyledChip = styled(Chip)({
  padding: '5px 6px !important',
  color: BLACK,
  fontSize: '0.875rem',
  textTransform: 'uppercase',
  fontWeight: 400,
  height: 'unset',
  borderRadius: '100px',
  border: `0.5px solid ${accentGrey[40]}`,
  background: WHITE,
  maxWidth: '14.375rem'
});

export const StyledPaper = styled(Paper)({
  width: 300,
  height: 280,
  overflow: 'auto',
  backgroundColor: ALICE_BLUE,
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
});

export const ListHeading = styled(Typography)({
  paddingBottom: '15px',
  color: STEEL_GRAY,
  textAlign: 'center',
  fontSize: '1rem',
  letterSpacing: '0.15px'
});

export const TransferButton = styled(Button)({
  margin: '5px 0',
  padding: '7px 0',
  borderRadius: '10px',
  borderColor: DARK_TEAL,
  boxShadow: 'none',
  '&:hover': {
    borderColor: KEPPEL
  }
});

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
