import { Components, Theme } from '@mui/material';
import React from 'react';
import { CheckboxIcon } from '../../icons/Checkbox/CheckboxIcon';
import { CheckboxCheckedIcon } from '../../icons/Checkbox/CheckboxCheckedIcon';

export const MuiCheckbox: Components<Theme>['MuiCheckbox'] = {
  defaultProps: {
    icon: React.createElement(CheckboxIcon),
    checkedIcon: React.createElement(CheckboxCheckedIcon),
  },
  styleOverrides: {
    root: ({ theme, ownerState }) => {
      const {
        palette: {
          text: { default: defaultText },
          icon: { inverse: inverseColor },
          border: { strong }
        }
      } = theme;

      const inverseBackground = ownerState.inverseBackground || false;

      return {
        color: inverseBackground ? inverseColor : strong,
        '&.Mui-checked': {
          color: defaultText,
        },
        '& .MuiSvgIcon-root': {
          width: '1.25rem',
          height: '1.25rem',
          padding: '0px'
        },
        '&:hover': {
          backgroundColor: 'transparent'
        }
      };
    }
  }
};
