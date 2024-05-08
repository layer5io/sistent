import { Components, Theme } from '@mui/material';

export const MuiCard: Components<Theme>['MuiCard'] = {
  styleOverrides: {
    root: {
      backgroundImage:
        'radial-gradient( circle 3000px at 50% 50%,  rgba(30,33,23,0) 0%, rgba(30,33,23,0.05) 10%, rgba(30,33,23,.1) 100% )'
    }
  }
};
