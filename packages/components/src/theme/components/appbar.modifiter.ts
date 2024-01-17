import { Components, Theme } from '@mui/material';
import { drawerWidth } from '../theme';

export const SistentAppBar: Components<Theme>['MuiAppBar'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          primary: { main }
        }
      } = theme;
      return {
        width: `calc(100% - ${drawerWidth}px)`,
        ml: { sm: `${drawerWidth}px` },
        elevation: 2,
        background: main
      };
    }
  }
};
