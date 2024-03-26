import { Components, Theme } from '@mui/material';

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { graphics }
        }
      } = theme;
      return {
        '--TextField-brandBorderColor': 'rgba(0, 0, 0, 0.5)',
        '--TextField-brandBorderHoverColor': graphics?.default,
        '--TextField-brandBorderFocusedColor': graphics?.default,
        '& label.Mui-focused': {
          color: 'var(--TextField-brandBorderFocusedColor)'
        }
      };
    }
  }
};
