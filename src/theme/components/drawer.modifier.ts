import { Components, Theme } from '@mui/material';

export const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { default: defaultBackground }
        }
      } = theme;
      return {
        background: defaultBackground
      };
    }
  }
};
