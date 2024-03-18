import { Components, Theme } from '@mui/material';
import { drawerWidth } from '../theme';

export const MuiAppBar: Components<Theme>['MuiAppBar'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { default: defaultBackground }
        }
      } = theme;
      return {
        width: `calc(100% - ${drawerWidth}px)`,
        ml: { sm: `${drawerWidth}px` },
        elevation: 2,
        background: defaultBackground
      };
    }
  }
};
