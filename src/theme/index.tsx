import {
  Theme,
  ThemeProvider,
  alpha,
  createTheme,
  keyframes,
  lighten,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
export { darkModePalette, lightModePalette } from './palette';
export { typography } from './typography';
export {type PrimitivePalette,SistentDefaultPrimitivePaletteDark,SistentDefaultPrimitivePaletteLight} from "./theme";
export * from './colors';
export {
  default as SistentThemeProvider,
  SistentThemeProviderWithoutBaseLine
} from './ThemeProvider';

export { ThemeProvider, alpha, createTheme, keyframes, lighten, styled, useMediaQuery, useTheme };
export type { Theme };
