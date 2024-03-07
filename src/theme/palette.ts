import { PaletteOptions, lighten } from '@mui/material';
import {
  CHARCOAL,
  KEPPEL,
  accentGrey,
  actionIcon,
  buttonDelete,
  common,
  cultured,
  notificationColors
} from './colors';
import { background, carribean, charcoal, darkSlateGray } from './colors/colors';

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
    disabled: {
      main: string;
    };
    checkbox: {
      main: string;
    };
    switch: {
      main: string;
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
    disabled?: {
      main: string;
    };
    checkbox?: {
      main?: string;
    };
    switch?: {
      main?: string;
    };
  }
}

export const lightModePalette: PaletteOptions = {
  primary: {
    main: CHARCOAL,
    light: lighten(CHARCOAL, 0.7),
    contrastText: common.white
  },
  secondary: {
    main: KEPPEL
  },
  background: {
    default: accentGrey[90],
    paper: accentGrey[90]
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
    light: notificationColors.warning.light,
    contrastText: common.white
  },
  success: {
    main: notificationColors.success.main
  },
  common: {
    black: common.black,
    white: common.white
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
  disabled: {
    main: background['brand-disabled']
  },
  checkbox: {
    main: darkSlateGray.main
  },
  switch: {
    main: carribean[40]
  },
  neutral: {},
  text: {}
};

export const darkModePalette: PaletteOptions = {
  primary: {
    main: KEPPEL,
    light: lighten(KEPPEL, 0.7),
    contrastText: common.white
  },
  secondary: {
    main: KEPPEL
  },
  background: {
    default: accentGrey[10],
    paper: accentGrey[10]
  },
  info: {
    main: notificationColors.info.main,
    contrastText: common.white
  },
  error: {
    main: notificationColors.error.main,
    dark: notificationColors.error.dark,
    contrastText: common.white
  },
  warning: {
    main: notificationColors.warning.main,
    light: notificationColors.warning.light,
    contrastText: common.white
  },
  success: {
    main: notificationColors.success.main,
    contrastText: common.white
  },
  common: {
    black: common.black,
    white: common.white
  },
  disabled: {
    main: charcoal[20]
  },
  checkbox: {
    main: KEPPEL
  },
  neutral: {}
};
