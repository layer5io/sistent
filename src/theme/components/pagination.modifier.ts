import { Components, Theme } from '@mui/material';
import { white } from '../colors';

export const MuiPagination: Components<Theme>['MuiPagination'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { brand }
        }
      } = theme;
      return {
        button: {
          '&:hover': {
            backgroundColor: brand?.hover
          },
          '&.Mui-selected': {
            color: white.main,
            backgroundColor: brand?.default
          }
        }
      };
    }
  }
};
