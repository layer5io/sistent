import { Components, Theme } from '@mui/material';

export const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    root: {
      '& .MuiDrawer-paper': {
        boxSize: 'border-box'
      }
    }
  }
};
