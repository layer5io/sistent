import { Components, Theme } from '@mui/material';

export const MuiIconButton: Components<Theme>['MuiIconButton'] = {
  styleOverrides: {
    root: {
      '@media (max-width: 400px)': {
        padding: '2px'
      }
    }
  }
};
