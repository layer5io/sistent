import { Components, Theme } from '@mui/material';
import { anakiwa, connected, white } from '../colors';

export const MuiPagination: Components<Theme>['MuiPagination'] = {
  styleOverrides: {
    root: {
      button: {
        '&:hover': {
          backgroundColor: anakiwa.main
        },
        '&.Mui-selected': {
          color: white.main,
          backgroundColor: connected.main
        }
      }
    }
  }
};
