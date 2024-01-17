import { Components, Theme } from '@mui/material';
import { DARK_BLUE_GRAY } from '../colors';
import { drawerWidth } from '../theme';

export const SistentDrawer: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    root: {
      width: drawerWidth,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSize: 'border-box',
        background: DARK_BLUE_GRAY
      }
    }
  }
};
