import { Components, Theme } from '@mui/material';
import { CARIBBEAN_GREEN, KEPPEL, WHITE, buttonDisabled } from '../colors';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: '3px',
      textTransform: 'none',
      '&.Mui-disabled': {
        backgroundColor: buttonDisabled.main,
        color: WHITE
      }
    },
    contained: {
      backgroundColor: KEPPEL,
      '&:hover': {
        backgroundColor: CARIBBEAN_GREEN,
        color: WHITE
      }
    },
    outlined: {
      '&:hover': {
        backgroundColor: CARIBBEAN_GREEN,
        color: WHITE
      }
    }
  }
};
