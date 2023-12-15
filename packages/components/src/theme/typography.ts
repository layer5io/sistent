import { PaletteMode } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import QanelasSoftRegular from '../assets/fonts/QanelasSoftRegular.woff2';
import { common } from './colors';

export const typography = (mode: PaletteMode): TypographyOptions => {
  return {
    fontFamily: [QanelasSoftRegular, 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
    body1: {
      fontFamily: ['Open Sans', 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
      fontSize: '16px'
    },
    body2: {
      fontFamily: ['Open Sans', 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '28px'
    },
    h1: {
      fontSize: '64px',
      lineHeight: '80px',
      fontWeight: 'bold'
    },
    h2: {
      fontSize: '52px',
      lineHeight: '64px',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 'bold'
    },
    h4: {
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      fontWeight: 600
    },
    h5: {
      color: mode === 'light' ? common.black : common.white,
      fontSize: '1rem',
      fontWeight: 'bold',
      lineHeight: '1.75rem'
    },
    h6: {
      color: mode === 'light' ? common.black : common.white,
      fontSize: '12px',
      fontWeight: 'bold',
      lineHeight: '16px',
      textTransform: 'uppercase'
    },
    subtitle1: {
      fontFamily: ['Open Sans', 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '28px'
    },
    subtitle2: {
      fontFamily: ['Open Sans', 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '24px'
    },
    button: {},
    caption: {},
    overline: {}
  };
};
