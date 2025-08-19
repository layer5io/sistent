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
export * from './colors';
export { darkModePalette, lightModePalette } from './palette';
export {
  SistentDefaultPrimitivePaletteDark,
  SistentDefaultPrimitivePaletteLight,
  type PrimitivePalette
} from './theme';
export {
  default as SistentThemeProvider,
  SistentThemeProviderWithoutBaseLine
} from './ThemeProvider';
export { typography } from './typography';

export { ThemeProvider, alpha, createTheme, keyframes, lighten, styled, useMediaQuery, useTheme };
export type { Theme };
