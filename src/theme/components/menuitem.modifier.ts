import { Components, Theme } from '@mui/material';

export const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { hover }
        }
      } = theme;
      return {
        '&:hover': {
          '& li': {
            color: hover,
            fill: hover
          }
        },

        '& svg': {
          '&:hover': {
            fill: hover
          }
        },

        '&.Mui-disabled': {
          '&:hover': {
            cursor: 'not-allowed'
          }
        }
      };
    }
  }
};
