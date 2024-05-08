import { Components, Theme } from '@mui/material';
import { DARK_BLUE_GRAY } from '../colors';

export const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    root: {
      '& .MuiDrawer-paper': {
        boxSize: 'border-box',
        background: DARK_BLUE_GRAY
      }
    }
  }
};
