import { Components, Theme } from '@mui/material';
import { connected } from '../colors';

export const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          primary: { main },
          checkbox: { main: checkboxMain }
        }
      } = theme;
      return {
        color: 'transparent',
        '&.Mui-checked': {
          color: checkboxMain,
          '& .MuiSvgIcon-root': {
            width: '1.25rem',
            height: '1.25rem',
            borderColor: connected.main,
            marginLeft: '0px',
            padding: '0px'
          }
        },
        '& .MuiSvgIcon-root': {
          width: '1.25rem',
          height: '1.25rem',
          border: `.75px solid ${main}`,
          borderRadius: '2px',
          padding: '0px'
        },
        '&:hover': {
          backgroundColor: 'transparent'
        }
      };
    }
  }
};
