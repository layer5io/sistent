import { PaletteMode, createTheme } from '@mui/material';
import { components } from './components';
import { darkModePalette, lightModePalette } from './palette';
import { typography } from './typography';

export const drawerWidth = 240;

export const createCustomTheme = (paletteType: PaletteMode) => {
  const palette = paletteType === 'light' ? lightModePalette : darkModePalette;

  const theme = createTheme({
    palette,
    components,
    typography: typography(paletteType),
    breakpoints: {}
  });

  return theme;
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
