import { Components, Theme } from '@mui/material';
import { GRAY } from '../colors';

export const MuiTab: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: 'none',
      color: theme.palette.text.primary,
      '&.Mui-selected': {
        backgroundColor: 'none',
        color: theme.palette.mode === 'dark' ? GRAY : GRAY
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
      }
    })
  }
};
