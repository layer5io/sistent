import { Components, Theme } from '@mui/material';

export const MuiMenu: Components<Theme>['MuiMenu'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        typography: { fontFamily }
      } = theme;
      return {
        paper: {
          fontFamily: fontFamily,
          '& .MuiMenuItem-root.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.08)'
            }
          }
        }
      };
    }
  }
};
