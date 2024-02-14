import { Components, Theme } from '@mui/material';
import { CARIBBEAN_GREEN } from '../colors';

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  styleOverrides: {
    root: {
      '--TextField-brandBorderColor': 'rgba(0, 0, 0, 0.5)',
      '--TextField-brandBorderHoverColor': CARIBBEAN_GREEN,
      '--TextField-brandBorderFocusedColor': CARIBBEAN_GREEN,
      '& label.Mui-focused': {
        color: 'var(--TextField-brandBorderFocusedColor)'
      }
    }
  }
};
