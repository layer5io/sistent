import { Components, Theme } from '@mui/material';

export const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const {
        palette: {
          text: { default: defaultText },
          icon: { inverse: inverseColor },
          background: { brand },
          border: { strong }
        }
      } = theme;

      const inverseBackground = ownerState.inverseBackground || false;

      return {
        '&.Mui-checked': {
          color: defaultText,
          '& .MuiSvgIcon-root': {
            width: '1.25rem',
            height: '1.25rem',
            borderColor: brand?.default,
            marginLeft: '0px',
            fill: inverseBackground ? inverseColor : defaultText,
            padding: '0px'
          }
        },
        '&:not(.Mui-checked):not(.Mui-indeterminate) .MuiSvgIcon-root': {
          color: 'transparent'
        },
        '& .MuiSvgIcon-root': {
          width: '1.25rem',
          height: '1.25rem',
          border: `.75px solid ${inverseBackground ? inverseColor : strong}`,
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
