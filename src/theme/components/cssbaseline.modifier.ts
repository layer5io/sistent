import { Components, Theme } from '@mui/material';

export const MuiCssBaseline: Components<Theme>['MuiCssBaseline'] = {
  styleOverrides: `
    @font-face {
      font-family: 'Qanelas Soft Regular';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: 
        local('QanelasSoftRegular'),
        local('Quanelas Soft Regular'),
        url('/assets/fonts/QanelasSoftRegular.woff2') format('woff2');
    }
    `
};
