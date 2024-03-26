import { Components, Theme } from '@mui/material';

export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { brand }
        }
      } = theme;
      return {
        '&.Mui-focused': {
          color: brand?.default
        }
      };
    }
  }
};
