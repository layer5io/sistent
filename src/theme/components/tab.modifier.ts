import { Components, Theme } from '@mui/material';
import { GRAY } from '../colors';

export const MuiTab: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: 'transparent',
      color: theme.palette.text.primary,
      '&.Mui-selected': {
        backgroundColor: 'transparent',
        color: theme.palette.mode === 'dark' ? GRAY : GRAY
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      }
    })
  }
};
