import { Interactiveness, PaletteMode, createTheme } from '@mui/material';
import _ from 'lodash';
import { components } from './components';
import { darkModePalette, lightModePalette } from './palette';
import { typography } from './typography';

export const drawerWidth = 240;

export const createCustomTheme = (mode: PaletteMode, brandPalette?: Interactiveness) => {
  const basePalette = mode == 'light' ? lightModePalette : darkModePalette;

  console.log('Creating theme with mode:', mode, 'and brandPalette:', brandPalette);

  const customBrandedTheme = brandPalette ? {
    primary: {
        main: brandPalette.default ,
        secondary: brandPalette.hover,
    },
    secondary: {
      main: brandPalette.secondary,
      secondary: brandPalette.secondary,
    },
    background: {
      brand: brandPalette
    }
  } : {};

  const themePalette = _.merge({}, basePalette, customBrandedTheme);

  
  return createTheme({
    palette: {
      mode,
      ...themePalette
    },
    components,
    typography: typography(mode),
    breakpoints: {}
  });
};
