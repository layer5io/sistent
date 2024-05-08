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
    textH1Bold?: React.CSSProperties;
    textH2Medium?: React.CSSProperties;
    textH3Medium?: React.CSSProperties;
    textB1Regular?: React.CSSProperties;
    textB2SemiBold?: React.CSSProperties;
    textB3Regular?: React.CSSProperties;
    textL1Bold?: React.CSSProperties;
    textL2Regular?: React.CSSProperties;
    textC1Regular?: React.CSSProperties;
    textC2Regular?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    textH1Bold: true;
    textH2Medium: true;
    textH3Medium: true;
    textB1Regular: true;
    textB2SemiBold: true;
    textB3Regular: true;
    textL1Bold: true;
    textL2Regular: true;
    textC1Regular: true;
    textC2Regular: true;
  }
}

const theme = createTheme();

export const typography = (mode: PaletteMode): TypographyOptions => {
  return {
    fontFamily: ['Qanelas Soft Regular', 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
    textH1Bold: {
      fontFamily: ['Qanelas Soft Regular'].join(','),
      fontSize: '3.25rem',
      lineHeight: '4rem',
      fontWeight: 700,
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '2rem',
        lineHeight: '2.5rem'
      }
    },
    textH2Medium: {
      fontFamily: ['Qanelas Soft Regular'].join(','),
      fontSize: '2rem',
      lineHeight: '2.5rem',
      fontWeight: 500,
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.5rem',
        lineHeight: '2.25rem'
      }
    },
    textH3Medium: {
      fontFamily: ['Qanelas Soft Regular'].join(','),
      fontSize: '1.5rem',
      lineHeight: '2.25rem',
      fontWeight: 500,
      display: 'block',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.75rem',
        fontWeight: 700
      }
    },
    textB1Regular: {
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
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
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
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
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
      display: 'block'
    },
    textL1Bold: {
      fontFamily: ['Qanelas Soft Regular'].join(','),
      fontSize: '0.75rem',
      fontWeight: 700,
      lineHeight: '1rem',
      display: 'block'
    },
    textL2Regular: {
      fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
      display: 'block'
    },
    textC1Regular: {
      fontFamily: ['Consolas', 'monospace'].join(','),
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
      display: 'block'
    },
    textC2Regular: {
      fontFamily: ['Consolas', 'monospace'].join(','),
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.75rem',
      display: 'block'
    },
    caption: {},
    overline: {}
  };
};
