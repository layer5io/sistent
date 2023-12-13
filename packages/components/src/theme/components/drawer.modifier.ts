import { Components, Theme } from '@mui/material';
import { drawerWidth } from '../theme';

export const MuiDrawer: Components<Theme>['MuiDrawer'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          primary: { main }
        }
      } = theme;
      return {
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSize: 'border-box',
          background: main
        }
      };
    }
  }
};
