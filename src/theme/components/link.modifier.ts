import { Components, Theme } from '@mui/material';

export const MuiLink: Components<Theme>['MuiLink'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          text: { default: defaultText },
          background: { brand }
        }
      } = theme;
      return {
        fontWeight: '600',
        textDecoration: 'none',
        color: defaultText,
        '&:visited': {
          textDecoration: 'none'
        },
        '&:hover': {
          textDecoration: 'underline'
        },
        '&.keppel': {
          color: brand?.default
        },
        '&.Mui-disabled': {
          '&:hover': {
            cursor: 'not-allowed'
          }
        }
      };
    }
  }
};
