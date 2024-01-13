import { Components, Theme } from '@mui/material';
import { darkTeal } from '../colors';

export const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  styleOverrides: {
    root: {
      '&:hover': {
        '& li': {
          color: darkTeal.dark,
          fill: darkTeal.dark
        }
      },

      '& svg': {
        '&:hover': {
          fill: darkTeal.dark
        }
      },

      '&.Mui-disabled': {
        '&:hover': {
          cursor: 'not-allowed'
        }
      }
    }
  }
};
