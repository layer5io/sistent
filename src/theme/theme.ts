import { PaletteMode, createTheme } from '@mui/material';
import { components } from './components';
import { darkModePalette, lightModePalette } from './palette';
import { typography } from './typography';

export const drawerWidth = 240;

export const createCustomTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightModePalette : darkModePalette)
    },
    components,
    typography: typography(mode),
    breakpoints: {}
  });
};

/*
  const commonPalette = {
    palette: {
      paletteType,
      ...(paletteType === 'light' ? lightModePalette : darkModePalette)
    }
  };


  const palette =
    paletteType === 'dark'
      ? {
          mode: 'dark',
          ...commonPalette,
          text: {
            main: '#FFFFFF'
          }
        }
      : {
          mode: 'light',
          ...commonPalette
        };
        */
