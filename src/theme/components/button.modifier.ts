import { Components, Theme } from '@mui/material';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { brand, hover, error, success, warning },
          text: { disabled, constant, neutral: TextNeutral },
          border: { neutral }
        },
        typography: { textB2SemiBold }
      } = theme;
      return {
        ...textB2SemiBold,
        fontWeight: 500,
        lineHeight: 'normal',
        '&.MuiButton-contained': {
          color: constant?.white,
          backgroundColor: brand?.default,
          '&:hover': {
            backgroundColor: brand?.hover
          }
        },
        // Contained buttons default to the brand colour above. Honour the
        // semantic `color` prop so destructive / success / warning actions are
        // not silently painted brand (keppel) — the long-standing gap that made
        // `<Button variant="contained" color="error">` render green. These
        // rules share the `&.MuiButton-contained` selector's (0,0,2,0)
        // specificity and follow it in source order, so a `color="error"`
        // button (which carries BOTH classes) resolves to the error colour;
        // the higher-specificity `.Mui-disabled` rules below still win when
        // disabled.
        '&.MuiButton-containedError': {
          color: constant?.white,
          backgroundColor: error?.default,
          '&:hover': {
            backgroundColor: error?.hover
          }
        },
        '&.MuiButton-containedSuccess': {
          color: constant?.white,
          backgroundColor: success?.default,
          '&:hover': {
            backgroundColor: success?.hover
          }
        },
        '&.MuiButton-containedWarning': {
          color: constant?.white,
          backgroundColor: warning?.default,
          '&:hover': {
            backgroundColor: warning?.hover
          }
        },
        '&.MuiButton-outlined': {
          border: `1px solid ${neutral?.default}`,
          '&:hover': {
            backgroundColor: hover,
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
