import { alpha } from '@mui/material';

/**
 * Define the base common colors to derive from
 */
export const KEPPEL = '#00B39F';
export const DARK_KEPPEL = '#00A18F';
export const CARIBBEAN_GREEN = '#00D3A9';
export const TEAL_BLUE = '#477E96';
export const DARK_TEAL_BLUE = '#3B687B';
export const CHARCOAL = '#3C494F';
export const BLACK = '#000000';
export const MIDNIGHT_BLACK = '#111111';
export const ALABASTER_WHITE = '#FAFAFA';
export const WHITE = '#FFFFFF';
export const ONYX_BLACK = '#1D1817';
export const SLATE_BLUE = '#3C494F';
export const TRANSPARENT_WHITE = '#ffffff66';
export const SILVER_GRAY = '#E6E6E6';
export const DARK_SHADE_GRAY = '#222222';
export const CHINESE_SILVER = '#CCCCCC'; // same as lightGray
export const SAFFRON = '#EBC017';
export const GRAY = '#696969';
export const GRAY97 = '#f7f7f7';
export const DARK_SLATE_GRAY = '#294957';
export const LIGHT_GRAY = '#d3d3d3'; // same as tableBorder
export const STEEL_GRAY = '#525252';
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
export const DARK_BLUE_GRAY = '#263238';
export const BUTTON_MODAL = '#396679';
export const BUTTON_MODAL_DARK = '#202020';
export const SLIGHT_BLUE = '#548194';
export const SLIGHT_BLACK_2 = '#23365f';
export const SNOW_WHITE = '#FBFBFB';
export const MEDIUM_GREY = '#DDDDDD';
export const common = {
  black: BLACK,
  white: WHITE
};

export const keppel = {
  70: '#daf3eb',
  60: '#93E6D1',
  50: '#41CCB3',
  40: '#00B39F',
  30: '#007763',
  20: '#006661',
  10: '#00403f'
};

export const carribean = {
  70: '#E6FFF6',
  60: '#A3FFE0',
  50: '#78FAD3',
  40: '#00D3A9',
  30: '#00AD90',
  20: '#006157',
  10: '#003B37'
};

export const saffron = {
  70: '#FFFEE6',
  60: '#fffbbd',
  50: '#ffeb6b',
  40: '#ebc017',
  30: '#c4990a',
  20: '#785400',
  10: '#523600'
};

/**
 * Grayscale Colors
 */
export const charcoal = {
  100: '#FDFDFD',
  90: '#EAEDEE',
  80: '#D2D8DA',
  70: '#B1B9BC',
  60: '#8C999E',
  50: '#647176',
  40: '#3C494E',
  30: '#28353A',
  20: '#142126',
  10: '#000D12'
};

export const accentGrey = {
  100: '#F6F8F8',
  90: '#E8EFF3',
  80: '#C9DBE3',
  70: '#ABBDC5',
  60: '#8D9FA7',
  50: '#6F8189',
  40: '#51636B',
  30: '#3D4F57',
  20: '#293B43',
  10: '#15272F'
};

/**
 * Function Colors
 */
export const blue = {
  70: '#F0FBFF',
  60: '#9EDDFF',
  50: '#75CAFF',
  40: '#2196F3',
  30: '#1272CC',
  20: '#0754A6',
  10: '#003980'
};

export const green = {
  70: '#EFFCED',
  60: '#B2E3AF',
  50: '#5BC95B',
  40: '#36BC3B',
  30: '#15701E',
  20: '#0A4A13',
  10: '#05340A'
};

export const yellow = {
  70: '#FFFCE6',
  60: '#FFE57D',
  50: '#FFC72B',
  40: '#FFB302',
  30: '#D99100',
  20: '#8C5400',
  10: '#663A00'
};

export const red = {
  70: '#FFF0F0',
  60: '#FFB3B9',
  50: '#FF6179',
  40: '#ff385c',
  30: '#B3153D',
  20: '#8C0a2F',
  10: '#660624'
};

export const redOrange = {
  70: '#E8BEB3',
  60: '#E1A999',
  50: '#D99380',
  40: '#D17D66',
  30: '#CA684D',
  20: '#C25233',
  10: '#BB3D1A'
};

export const defaultPalette = {
  keppel: ['#DAF3EB', '#93E6D1', '#41CCB3', '#00B39F', '#007763', '#006661', '#00403F']
};

type BackgroundColor = {
  [key in
    | 'default'
    | 'secondary'
    | 'tertiary'
    | 'hover'
    | 'brand-default'
    | 'info-default'
    | 'success-default'
    | 'warning-default'
    | 'error-default']: string;
};

export const background: BackgroundColor = {
  default: charcoal[100],
  secondary: accentGrey[90],
  tertiary: accentGrey[80],
  hover: charcoal[90],
  'brand-default': accentGrey[40],
  'info-default': blue[30],
  'success-default': green[30],
  'warning-default': yellow[30],
  'error-default': red[30]
};

interface TextColor {
  default: string;
  secondary: string;
  tertiary: string;
  inverse: string;
  brand: string;
  info: string;
  success: string;
  warning: string;
  error: string;
}

export const text: TextColor = {
  default: charcoal[10],
  secondary: charcoal[90],
  tertiary: charcoal[50],
  inverse: charcoal[100],
  brand: accentGrey[40],
  info: blue[30],
  success: green[30],
  warning: yellow[30],
  error: red[30]
};

interface BorderColor {
  default: string;
  strong: string;
  brand: string;
}

export const border: BorderColor = {
  default: charcoal[90],
  strong: charcoal[50],
  brand: accentGrey[40]
};

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

export const darkTeal = {
  main: DARK_TEAL,
  dark: LIGHT_TEAL
};

export const actionIcon = {
  main: darkTeal.main,
  hover: darkTeal.dark
};

export const tabMenu = {
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

export const darkModalGradient = {
  header: `linear-gradient(90deg, ${charcoal[30]} 0%, ${accentGrey[30]} 100%)`,
  fotter: `linear-gradient(90deg, ${accentGrey[30]} 0%, ${charcoal[30]} 100%)`
};

export const lightModalGradient = {
  header: `linear-gradient(90deg, ${TEAL_BLUE} 0%, ${DARK_TEAL_BLUE} 100%)`,
  fotter: `linear-gradient(90deg, ${DARK_TEAL_BLUE} 0%, ${TEAL_BLUE} 100%)`
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
