import { Components, Theme } from '@mui/material';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { brand },
          text: { tertiary, default: defaultText }
        },
        typography: { textB2SemiBold }
      } = theme;
      return {
        ...textB2SemiBold,
        fontFamily: 'Qanelas Soft, sans-serif',
        '&.MuiButton-contained': {
          color: defaultText,
          backgroundColor: brand?.default,
          '&:hover': {
            backgroundColor: brand?.hover
          }
        },
        '&.MuiButton-outlined': {
          border: `1px solid ${brand?.default}`,
          '&:hover': {
            backgroundColor: brand?.hover,
            color: defaultText
          }
        },
        '&.MuiButton-contained.Mui-disabled': {
          color: tertiary,
          backgroundColor: brand?.disabled
        },
        '&.MuiButton-outlined.Mui-disabled': {
          border: `1px solid ${tertiary}`,
          backgroundColor: brand?.disabled,
          color: tertiary
        }
      };
    }
  }
};
