import { Components, Theme } from '@mui/material';
import { GRAY, WHITE } from '../colors';

export const MuiTab: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: 'none',
      color: theme.palette.mode === 'dark' ? WHITE : GRAY,
      '&.Mui-selected': {
        backgroundColor: 'none',
        color: theme.palette.mode === 'dark' ? GRAY : GRAY
      }
    })
  }
};
