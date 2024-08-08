import { Components, Theme } from '@mui/material';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { brand, neutral: BgNeutral },
          text: { disabled, constant, neutral: TextNeutral },
          border: { neutral }
        },
        typography: { textB2SemiBold }
      } = theme;
      return {
        ...textB2SemiBold,
        fontWeight: 500,
        '&.MuiButton-contained': {
          color: constant?.white,
          backgroundColor: brand?.default,
          '&:hover': {
            backgroundColor: brand?.hover
          }
        },
        '&.MuiButton-outlined': {
          border: `1px solid ${neutral?.default}`,
          '&:hover': {
            backgroundColor: BgNeutral?.pressed,
            color: TextNeutral?.default
          }
        },
        '&.MuiButton-contained.Mui-disabled': {
          color: disabled,
          backgroundColor: brand?.disabled
        },
        '&.MuiButton-outlined.Mui-disabled': {
          border: `1px solid ${disabled}`,
          backgroundColor: brand?.disabled,
          color: disabled
        }
      };
    }
  }
};
