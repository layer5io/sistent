import { PaletteMode } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import QanelasSoftRegular from '../assets/fonts/QanelasSoftRegular.woff2';

export const typography = (paletteType: PaletteMode): TypographyOptions => {
  return {
    fontFamily: [QanelasSoftRegular, 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(','),
    body1: {
      fontFamily: [QanelasSoftRegular, 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(',')
    },
    body2: {
      fontFamily: [QanelasSoftRegular, 'Roboto', 'Helvectica', 'Arial', 'sans-serif'].join(',')
    },
    h5: {
      color: paletteType === 'light' ? '#000000' : '#FFFFFF'
    },
    h6: {
      color: paletteType === 'light' ? '#000000' : '#FFFFFF'
    }
  };
};
