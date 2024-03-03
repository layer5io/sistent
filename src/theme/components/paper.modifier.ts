import { Components, Theme } from '@mui/material';

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { paper }
        }
      } = theme;
      return {
        backgroundColor: paper
      };
    }
  }
};
