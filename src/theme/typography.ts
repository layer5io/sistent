import { PaletteMode, createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { common } from './colors';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    textH1Bold: React.CSSProperties;
    textH2Medium: React.CSSProperties;
    textH3Medium: React.CSSProperties;
    textB1Regular: React.CSSProperties;
    textB2SemiBold: React.CSSProperties;
    textB3Regular: React.CSSProperties;
    textL1Bold: React.CSSProperties;
    textL2Regular: React.CSSProperties;
    textC1Regular: React.CSSProperties;
    textC2Regular: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    textH1Bold: React.CSSProperties;
    textH2Medium: React.CSSProperties;
    textH3Medium: React.CSSProperties;
    textB1Regular: React.CSSProperties;
    textB2SemiBold: React.CSSProperties;
    textB3Regular: React.CSSProperties;
    textL1Bold: React.CSSProperties;
    textL2Regular: React.CSSProperties;
    textC1Regular: React.CSSProperties;
    textC2Regular: React.CSSProperties;
  }
}

const theme = createTheme();

export const typography = (mode: PaletteMode): TypographyOptions => {
  return {
    fontFamily: ['Qanelas Soft Regular', 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
    textH1Bold: {
      fontFamily: ['Qanelas Soft'].join(','),
      fontSize: '52px',
      lineHeight: '64px',
      fontWeight: 700,
      [theme.breakpoints.down('sm')]: {
        fontSize: '32px',
        lineHeight: '40px'
      }
    },
    textH2Medium: {
      fontFamily: ['Qanelas Soft'].join(','),
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: 500,
      [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
        lineHeight: '36px'
      }
    },
    textH3Medium: {
      fontFamily: ['Qanelas Soft'].join(','),
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      fontWeight: 500,
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.75rem',
        fontWeight: 700
      }
    },
    textB1Regular: {
      fontFamily: ['Open Sans'].join(','),
      color: mode === 'light' ? common.black : common.white,
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.75rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.75rem'
      }
    },
    textB2SemiBold: {
      fontFamily: ['Open Sans'].join(','),
      color: mode === 'light' ? common.black : common.white,
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: '1.75rem',
      textTransform: 'capitalize',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.75rem'
      }
    },
    textB3Regular: {
      fontFamily: ['Open Sans'].join(','),
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.5rem'
    },
    textL1Bold: {
      fontFamily: ['Qanelas Soft'].join(','),
      fontSize: '0.75rem',
      fontWeight: 700,
      lineHeight: '1rem'
    },
    textL2Regular: {
      fontFamily: ['Open Sans'].join(','),
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '1.5rem'
    },
    textC1Regular: {
      fontFamily: ['Consolas'].join(','),
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '1.5rem'
    },
    textC2Regular: {
      fontFamily: ['Consolas'].join(','),
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.75rem'
    },
    caption: {},
    overline: {}
  };
};
