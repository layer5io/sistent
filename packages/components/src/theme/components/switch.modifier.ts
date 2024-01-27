import { Components, Theme } from '@mui/material';
import { CARIBBEAN_GREEN, CHARCOAL } from '../colors';

export const MuiSwitch: Components<Theme>['MuiSwitch'] = {
  styleOverrides: {
    root: {
      '& .MuiSwitch-switchBase': {
        color: CHARCOAL,
        '&:hover': {
          backgroundColor: 'rgba(60, 73, 79, 0.06)'
        }
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        color: CARIBBEAN_GREEN,
        '&:hover': {
          backgroundColor: 'rgba(0, 211, 169, 0.06)'
        }
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: CARIBBEAN_GREEN
      }
    }
  }
};
