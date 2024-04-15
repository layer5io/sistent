import { Components, Theme } from '@mui/material';

export const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  styleOverrides: {
    root: ({ theme }) => {
      const {
        palette: {
          text: { default: defaultText },
          background: { brand },
          border: { strong }
        }
      } = theme;
      return {
        color: 'transparent',
        '&.Mui-checked': {
          color: defaultText,
          '& .MuiSvgIcon-root': {
            width: '1.25rem',
            height: '1.25rem',
            borderColor: brand?.default,
            marginLeft: '0px',
            padding: '0px'
          }
        },
        '& .MuiSvgIcon-root': {
          width: '1.25rem',
          height: '1.25rem',
          border: `.75px solid ${strong}`,
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
