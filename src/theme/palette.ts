import { PaletteOptions } from '@mui/material';
import * as Colors from './colors';

declare module '@mui/material/styles' {
  interface Interactiveness {
    default: string;
    hover: string;
    disabled: string;
    pressed: string;
    secondary: string;
    tertiary: string;
  }

  interface PaletteColor {
    background: {
      default: string;
      primary: string;
      secondary: string;
      tertiary: string;
      hover: string;
      blur: {
        heavy: string;
        light: string;
      };
      brand: Interactiveness;
      cta: Interactiveness;
      info: Interactiveness;
      success: Interactiveness;
      warning: Interactiveness;
      error: Interactiveness;
      code: string;
    };
  }
  interface SimplePaletteColorOptions {
    background: {
      default: string;
      primary: string;
      secondary: string;
      tertiary: string;
      hover: string;
      blur: {
        heavy: string;
        light: string;
      };
      brand: Interactiveness;
      cta: Interactiveness;
      info: Interactiveness;
      success: Interactiveness;
      warning: Interactiveness;
      error: Interactiveness;
      code: string;
    };
  }
}

export const lightModePalette: PaletteOptions = {
  background: {
    default: Colors.charcoal[100],
    secondary: Colors.accentGrey[90],
    tertiary: Colors.accentGrey[80]
    // rest of token in background
  }
  // rest of tokens
};

export const darkModePalette: PaletteOptions = {
  // dark variants of the tokens
};
