import { Components, Theme } from '@mui/material';

export const MuiMenu: Components<Theme>['MuiMenu'] = {
  styleOverrides: {
    paper: {
      '& .MuiMenuItem-root.Mui-selected': {
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.08)'
        }
      }
    }
  }
};
