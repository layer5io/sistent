import { Components, Theme } from '@mui/material/styles';
import { CARIBBEAN_GREEN } from '../colors';

export const MuiInput: Components<Theme>['MuiInput'] = {
  styleOverrides: {
    root: {
      '&:before': {
        borderBottom: '2px solid rgba(0, 0, 0, 0.5)'
      },
      '&.Mui-focused:after': {
        borderBottom: ` 2px solid ${CARIBBEAN_GREEN}`
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: `2px solid ${CARIBBEAN_GREEN}`
      }
    }
  }
};
