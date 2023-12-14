import { alpha } from '@mui/material';

/**
 * Define the base common colors to derive from
 */
export const KEPPEL = '#00B39F';
export const CARIBBEAN_GREEN = '#00D3A9';
export const TEAL_BLUE = '#477E96';
export const CHARCOAL = '#3C494F';
export const BLACK = '#000000';
export const WHITE = '#FFFFFF';
export const DARK_SHADE_GRAY = '#222222';
export const CHINESE_SILVER = '#CCCCCC'; // same as lightGray
export const SAFFRON = '#EBC017';
export const GRAY = '#696969';
export const GRAY97 = '#f7f7f7';
export const DARK_SLATE_GRAY = '#294957';
export const LIGHT_GRAY = '#d3d3d3'; // same as tableBorder
export const ALICE_BLUE = '#EBEFF1';
export const LIMED_SPRUCE = '#3C494F';
export const WHITESMOKE = '#F5F5F5';
export const PRIMARY_COLOR = '#647881';
export const DARK_PRIMARY_COLOR = '#51636B';
export const SLATE_GRAY = '#7a848e';
export const DARK_JUNGLE_GREEN = '#1E2117';
export const CASPER = '#b1b6b8';
export const EERIE_BLACK = '#b1b6b8';
export const PATTERNS_BLUE = '#D9E0E2';
export const GREEN = 'green';
export const DARK_TEAL = '#455a64';
export const LIGHT_TEAL = '#607d8b';
export const CULTURED = '#F6F8F8';
export const ANAKIWA = '#9EFFEC';
export const NOT_FOUND = '#666666';
export const YELLOW_SEA = '#F0A303';
export const PINE_GREEN = '#008071';

/**
 * Use the colors below that provides the action that you want to use
 */
export const primaryColor = {
  main: PRIMARY_COLOR,
  dark: DARK_PRIMARY_COLOR
};

export const patternsBlue = {
  main: PATTERNS_BLUE
};

export const cultured = {
  main: CULTURED
};

export const green = {
  main: GREEN
};

export const darkTeal = {
  main: DARK_TEAL,
  dark: LIGHT_TEAL
};

export const actionIcon = {
  main: darkTeal.main,
  hover: darkTeal.dark
};

export const tabeMenu = {
  main: darkTeal.main,
  hover: darkTeal.dark
};

export const darkSlateGray = {
  main: DARK_SLATE_GRAY,
  dark: alpha(DARK_SLATE_GRAY, 0.65)
};

export const eerieBlack = {
  main: EERIE_BLACK,
  light: alpha(EERIE_BLACK, 0.8),
  lighter: alpha(EERIE_BLACK, 0.6)
};

export const casper = {
  main: CASPER,
  light: alpha(CASPER, 0.8),
  lighter: alpha(CASPER, 0.6)
};

export const slateGray = {
  main: SLATE_GRAY,
  light: alpha(SLATE_GRAY, 0.8)
};

export const white = {
  main: WHITE,
  light: alpha(WHITE, 0.8),
  lighter: alpha(WHITE, 0.6)
};

export const black = {
  main: BLACK,
  light: alpha(BLACK, 0.8),
  lighter: alpha(BLACK, 0.6),
  dark: alpha(BLACK, 0.2)
};

export const jungleGreen = {
  main: DARK_JUNGLE_GREEN,
  light: alpha(DARK_JUNGLE_GREEN, 0.8),
  lighter: alpha(DARK_JUNGLE_GREEN, 0.6)
};

export const buttonDisabled = {
  main: '#b0bec5'
};

export const tableBackgroundHover = {
  main: '#ADD8E6'
};

export const DELETE = '#8F1F00';
export const HOVER_DELETE = '#b32700';

export const redDelete = {
  main: DELETE,
  light: HOVER_DELETE
};

export const buttonDelete = {
  main: redDelete.main,
  hover: redDelete.light
};

/**
 * Notification Colors
 */
export const notificationColors = {
  info: {
    main: '#2196F3'
  },
  error: {
    main: '#F91313',
    dark: '#B32700'
  },
  warning: {
    main: '#F0A303',
    light: '#E75225'
  },
  success: {
    main: '#206D24'
  }
};

export const CONNECTED = KEPPEL;
export const REGISTERED = TEAL_BLUE;
export const DISCOVERED = notificationColors.info.main;
export const IGNORED = primaryColor.dark;
export const DELETED = redDelete.main;
export const MAINTAINENCE = notificationColors.warning.main;
export const DISCONNECTED = notificationColors.warning.light;

export const connected = {
  main: CONNECTED
};

export const anakiwa = {
  main: ANAKIWA
};

/**
 * Social media or equivalent icons colors
 */
export const socialIcons = {
  slack: '#4A154B',
  twitter: '#1da1f2',
  github: '#24292e',
  youtube: '#ff0000',
  docker: '#2496ed'
};
