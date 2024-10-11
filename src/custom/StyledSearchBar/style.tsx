import { styled } from '@mui/material';
import { InputAdornment, OutlinedInput } from '../../base';

export const StyledSearchInput = styled(OutlinedInput)(({ style }) => ({
  width: '100%',
  '@media (max-width: 590px)': {
    marginLeft: '0.25rem',
    paddingLeft: '0.25rem'
  },
  display: 'flex',
  ...style
}));

export const InputAdornmentEnd = styled(InputAdornment)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.border.normal}`,
  height: '30px',
  paddingLeft: '10px',
  '@media (max-width: 590px)': {
    paddingLeft: '0px'
  }
}));
