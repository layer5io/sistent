import { Components, Theme } from '@mui/material';
import { connected } from '../colors';

export const SistentFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: {
      '&.Mui-focused': {
        color: connected.main
      }
    }
  }
};
