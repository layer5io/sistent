import { Components, Theme } from '@mui/material';
import { connected } from '../colors';

export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: {
      '&.Mui-focused': {
        color: connected.main
      }
    }
  }
};
