import { Components, Theme } from '@mui/material';
import { connected, darkTeal } from '../colors';

export const SistentLink: Components<Theme>['MuiLink'] = {
  styleOverrides: {
    root: {
      fontWeight: '600',
      textDecoration: 'none',
      color: darkTeal.main,
      '&:visited': {
        textDecoration: 'none'
      },
      '&:hover': {
        textDecoration: 'underline'
      },
      '&.keppel': {
        color: connected.main
      },
      '&.Mui-disabled': {
        '&:hover': {
          cursor: 'not-allowed'
        }
      }
    }
  }
};
