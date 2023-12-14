import { PaletteOptions } from '@mui/material';
import {
  BLACK,
  CHARCOAL,
  KEPPEL,
  WHITE,
  actionIcon,
  buttonDelete,
  cultured,
  notificationColors
} from './colors';

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
  interface Palette {
    neutral?: Palette['primary'];
    cultured: {
      main: string;
    };
    actionIcon: {
      main: string;
      hover: string;
    };
    buttonDelete: {
      main: string;
      hover: string;
    };
  }
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    cultured?: {
      main?: string;
    };
    actionIcon?: {
      main?: string;
      hover?: string;
    };
    buttonDelete?: {
      main?: string;
      hover?: string;
    };
  }
}

export const lightModePalette: PaletteOptions = {
  primary: {
    main: CHARCOAL
  },
  secondary: {
    main: KEPPEL
  },
  info: {
    main: notificationColors.info.main
  },
  error: {
    main: notificationColors.error.main,
    dark: notificationColors.error.dark
  },
  warning: {
    main: notificationColors.warning.main,
    light: notificationColors.warning.light
  },
  success: {
    main: notificationColors.success.main
  },
  common: {
    black: BLACK,
    white: WHITE
  },
  cultured: {
    main: cultured.main
  },
  actionIcon: {
    main: actionIcon.main,
    hover: actionIcon.hover
  },
  buttonDelete: {
    main: buttonDelete.main,
    hover: buttonDelete.hover
  },
  neutral: {},
  text: {}
};

export const darkModePalette: PaletteOptions = {
  primary: {},
  secondary: {},
  neutral: {}
};
