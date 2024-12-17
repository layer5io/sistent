import { Components, Theme } from '@mui/material';
import { GRAY } from '../colors';

export const MuiTabs: Components<Theme>['MuiTabs'] = {
  styleOverrides: {
    root: {
      width: '100%',
      marginLeft: 0
    },
    indicator: ({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? GRAY : GRAY
    })
  }
};
