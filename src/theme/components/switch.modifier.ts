import { Components, Theme } from '@mui/material';

export const MuiSwitch: Components<Theme>['MuiSwitch'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          background: { graphics },
          border: { strong }
        }
      } = theme;
      return {
        '& .MuiSwitch-switchBase': {
          color: strong,
          '&:hover': {
            backgroundColor: 'rgba(60, 73, 79, 0.06)'
          }
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: graphics?.default,
          '&:hover': {
            backgroundColor: 'rgba(0, 211, 169, 0.06)'
          }
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: graphics?.default
        }
      };
    }
  }
};
