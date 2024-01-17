import { Components, Theme } from '@mui/material';
import { actionIcon, white } from '../colors';

export const SistentTab: Components<Theme>['MuiTab'] = {
  styleOverrides: {
    root: {
      '&.Mui-selected': {
        color: actionIcon.main,
        backgroundColor: white.main
      },
      backgroundColor: actionIcon.main,
      color: white.main
    }
  }
};
