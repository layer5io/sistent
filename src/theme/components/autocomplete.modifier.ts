import { Components, Theme } from '@mui/material';

export const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  styleOverrides: {
    clearIndicator: {
      boxShadow: 'none',
      width: 28,
      height: 28,
      padding: 0,
      borderRadius: '50%'
    },
    popupIndicator: {
      boxShadow: 'none',
      width: 28,
      height: 28,
      padding: 0,
      borderRadius: '50%'
    }
  }
};
