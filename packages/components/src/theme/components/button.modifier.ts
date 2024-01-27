import { Components, Theme } from '@mui/material';
import { CARIBBEAN_GREEN, WHITE, buttonDisabled } from '../colors';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          secondary: { main }
        }
      } = theme;
      return {
        '&.MuiButton-contained': {
          color: WHITE,
          backgroundColor: main,
          '&:hover': {
            backgroundColor: CARIBBEAN_GREEN
          }
        },
        '&.MuiButton-outlined': {
          border: `1px solid ${main}`,
          '&:hover': {
            backgroundColor: CARIBBEAN_GREEN,
            color: WHITE
          }
        },
        '&.MuiButton-contained.Mui-disabled': {
          color: buttonDisabled.main,
          backgroundColor: buttonDisabled.main
        }
      };
    }
  }
};
