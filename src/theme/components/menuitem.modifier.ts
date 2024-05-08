import { Components, Theme } from '@mui/material';

export const MuiMenuItem: Components<Theme>['MuiMenuItem'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          text: { tertiary }
        }
      } = theme;
      return {
        '&:hover': {
          '& li': {
            color: tertiary,
            fill: tertiary
          }
        },

        '& svg': {
          '&:hover': {
            fill: tertiary
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
