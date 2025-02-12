import { Components, Theme } from '@mui/material';

export const MuiTabs: Components<Theme>['MuiTabs'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette.background.tabs
    }),
    indicator: ({ theme }) => ({
      backgroundColor: theme.palette.background.brand?.default
    })
  }
};
