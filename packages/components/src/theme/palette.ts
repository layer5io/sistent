import { PaletteOptions } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface Palette {
    neutral?: Palette['primary'];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

export const lightModePalette: PaletteOptions = {
  primary: {
    main: blueGrey[600],
    light: blueGrey[400],
    dark: blueGrey[700]
  },
  secondary: {
    main: '#EE5351'
  },
  neutral: {}
};

export const darkModePalette: PaletteOptions = {
  primary: {},
  secondary: {},
  neutral: {}
};
