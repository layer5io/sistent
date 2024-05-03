import { Components, Theme } from '@mui/material/styles';

export const MuiInput: Components<Theme>['MuiInput'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { graphics }
        },
        typography: { textB1Regular }
      } = theme;
      return {
        ...textB1Regular,
        '&:before': {
          borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
        },
        '&.Mui-focused:after': {
          borderBottom: ` 2px solid ${graphics?.default}`
        },
        '&:hover:not(.Mui-disabled):before': {
          borderBottom: `2px solid ${graphics?.default}`
        }
      };
    }
  }
};
