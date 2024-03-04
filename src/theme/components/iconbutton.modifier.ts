import { Components, Theme } from '@mui/material';
import { KEPPEL } from '../colors';

export const MuiIconButton: Components<Theme>['MuiIconButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          iconButton: { main }
        }
      } = theme;
      return {
        color: main,
        '&:hover': {
          color: KEPPEL,
          backgroundColor: 'none'
        },
        '@media (max-width: 400px)': {
          padding: '2px'
        }
      };
    }
  }
};
