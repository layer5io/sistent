import { Components, Theme } from '@mui/material';

export const MuiTab: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          text: { default: defaultText },
          background: { tabs: defaultBackground }
        },
        typography: { textB1Regular }
      } = theme;
      return {
        ...textB1Regular,
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
