import { Components, Theme } from '@mui/material';
import { background, text } from '../colors/colors';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          secondary: { main },
          disabled: { main: buttonDisabled }
        }
      } = theme;
      return {
        '&.MuiButton-contained': {
          color: text.default,
          backgroundColor: main,
          '&:hover': {
            backgroundColor: background['brand-default']
          }
        },
        '&.MuiButton-outlined': {
          border: `1px solid ${main}`,
          '&:hover': {
            backgroundColor: background['brand-default'],
            color: text.default
          }
        },
        '&.MuiButton-contained.Mui-disabled': {
          color: buttonDisabled,
          backgroundColor: buttonDisabled
        }
      };
    }
  }
};
