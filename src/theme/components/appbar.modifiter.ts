import { Components, Theme } from '@mui/material';

export const MuiAppBar: Components<Theme>['MuiAppBar'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { default: defaultBackground }
        }
      } = theme;
      return {
        elevation: 2,
        background: defaultBackground
      };
    }
  }
};
