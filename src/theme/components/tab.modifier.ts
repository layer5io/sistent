import { Components, Theme } from '@mui/material';

export const MuiTab: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          text: { default: defaultText },
          background: { tabs: defaultBackground }
        }
      } = theme;
      return {
        '&.Mui-selected': {
          color: defaultText,
          backgroundColor: defaultBackground
        },
        backgroundColor: 'none',
        color: defaultText
      };
    }
  }
};
