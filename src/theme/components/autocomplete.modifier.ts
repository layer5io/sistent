import { Components, Theme } from '@mui/material';

export const MuiAutocomplete: Components<Theme>['MuiAutocomplete'] = {
  styleOverrides: {
    root: ({ ownerState }) => ({
      '& .MuiInputLabel-root': {
        fontSize: ownerState?.size === 'small' ? '0.875rem' : '1rem',
        lineHeight: ownerState?.size === 'small' ? '1.25rem' : '1.75rem'
      },
      '& .MuiInputLabel-sizeSmall': {
        fontSize: '0.875rem',
        lineHeight: '1.25rem'
      }
    }),
    clearIndicator: {
      boxShadow: 'none',
      width: 28,
      height: 28,
      padding: 0,
      borderRadius: '50%'
    },
    popupIndicator: {
      boxShadow: 'none',
      width: 28,
      height: 28,
      padding: 0,
      borderRadius: '50%'
    }
  }
};
