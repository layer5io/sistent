import { Components, Theme } from '@mui/material';

export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { brand }
        },
        typography: { textB1Regular }
      } = theme;
      return {
        ...textB1Regular,
        '&.Mui-focused': {
          color: brand?.default
        }
      };
    }
  }
};
