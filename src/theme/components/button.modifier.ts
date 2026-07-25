import { Components, Theme } from '@mui/material';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { brand, hover, error, success, warning, info },
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
        // semantic `color` prop so error / success / warning / info actions are
        // not silently painted brand (keppel) - the long-standing gap that made
        // `<Button variant="contained" color="error">` render green. Text colour
        // is derived per-background with getContrastText so a light background
        // (notably the yellow warning) keeps a readable dark label instead of an
        // unreadable white one (WCAG). These rules share the
        // `&.MuiButton-contained` selector's (0,0,2,0) specificity and follow it
        // in source order, so a semantic-colour button (which carries BOTH
        // classes) resolves to its colour; the higher-specificity `.Mui-disabled`
        // rules below still win when disabled.
        '&.MuiButton-containedError': {
          color: error?.default ? theme.palette.getContrastText(error.default) : constant?.white,
          backgroundColor: error?.default,
          '&:hover': {
            backgroundColor: error?.hover
          }
        },
        '&.MuiButton-containedSuccess': {
          color: success?.default
            ? theme.palette.getContrastText(success.default)
            : constant?.white,
          backgroundColor: success?.default,
          '&:hover': {
            backgroundColor: success?.hover
          }
        },
        '&.MuiButton-containedWarning': {
          color: warning?.default
            ? theme.palette.getContrastText(warning.default)
            : constant?.white,
          backgroundColor: warning?.default,
          '&:hover': {
            backgroundColor: warning?.hover
          }
        },
        '&.MuiButton-containedInfo': {
          color: info?.default ? theme.palette.getContrastText(info.default) : constant?.white,
          backgroundColor: info?.default,
          '&:hover': {
            backgroundColor: info?.hover
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
