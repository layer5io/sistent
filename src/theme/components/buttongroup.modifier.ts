import { Components, Theme } from '@mui/material';

export const MuiButtonGroup: Components<Theme>['MuiButtonGroup'] = {
  styleOverrides: {
    grouped: ({ theme }) => ({
      borderColor: theme.palette.common.white
    })
  }
};
