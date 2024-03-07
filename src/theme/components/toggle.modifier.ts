import { Components, Theme } from '@mui/material';
import { text } from '../colors/colors';

export const MuiSwitch: Components<Theme>['MuiSwitch'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          switch: { main }
        }
      } = theme;
      return {
        '& .MuiSwitch-switchBase': {
          color: text.secondary,
          '&:hover': {
            backgroundColor: 'rgba(60, 73, 79, 0.06)'
          }
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: main,
          '&:hover': {
            backgroundColor: 'rgba(0, 211, 169, 0.06)'
          }
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: main
        }
      };
    }
  }
};
