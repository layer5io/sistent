import { PaletteOptions, alpha } from '@mui/material';
import * as Colors from './colors';

declare module '@mui/material/styles' {
  // Defines the interaction color options used in the palette.
  interface Interactiveness {
    default: string;
    hover: string;
    disabled?: string;
    pressed: string;
    secondary: string;
    tertiary: string;
  }
  // Defines the extended background color options used in the palette.
  interface TypeBackground {
    secondary?: string;
    supplementary?: string;
    graphics?: {
      default: string;
    };
    tertiary?: string;
    hover?: string;
    blur?: {
      heavy: string;
      light: string;
    };
    //additional color palette {neutral}
    neutral?: {
      default: string;
      hover: string;
      pressed: string;
    };
    constant?: {
      disabled: string;
      white: string;
    };
    inverse?: string;
    brand?: Interactiveness;
    cta?: Interactiveness;
    info?: Interactiveness;
    success?: Interactiveness;
    warning?: Interactiveness;
    error?: Interactiveness;
    code?: string;
  }

  // Defines the extended text color options used in the palette.
  interface TypeText {
    default?: string;
    secondary: string;
    tertiary?: string;
    disabled: string;
    inverse?: string;
    brand?: string;
    info?: string;
    success?: string;
    warning?: string;
    error?: string;
    neutral?: {
      default: string;
      alt: string;
    };
    constant?: {
      white: string;
      disabled: string;
    };
  }

  // Defines the color options for the palette
  interface PaletteColor {
    secondary?: string;
    supplementary?: string;
    blur?: {
      heavy: string;
      light: string;
    };
    neutral?: {
      default: string;
      hover: string;
      pressed: string;
      alt: string;
    };
    constant?: {
      white: string;
      disabled: string;
    };
    inverse?: string;
    brand?: Interactiveness;
    cta?: Interactiveness;
    info?: Interactiveness;
    success?: Interactiveness;
    warning?: Interactiveness;
    error?: Interactiveness;
    code?: string;
    strong?: string;
    normal?: string;
    disabled?: string;
  }

  // Defines the simple palette color options.
  interface SimplePaletteColorOptions {
    secondary?: string;
    supplementary?: string;
    blur?: {
      heavy: string;
      light: string;
    };
    neutral?: {
      default: string;
      hover: string;
      pressed: string;
      alt: string;
    };
    constant?: {
      white: string;
      disabled: string;
    };
    inverse?: string;
    brand?: Interactiveness;
    cta?: Interactiveness;
    info?: Interactiveness;
    success?: Interactiveness;
    warning?: Interactiveness;
    error?: Interactiveness;
    code?: string;
    strong?: string;
    normal?: string;
    disabled?: string;
  }

  /* Defines the palette containing border and icon color options.
    To define any additional custom color options, you can extend the interface here.
  */
  interface Palette {
    border: {
      default: string;
      strong: string;
      brand: string;
      normal: string;
      neutral?: {
        default: string;
        alt: string;
      };
    };
    icon: {
      default: string;
      secondary: string;
      brand: string;
      inverse: string;
      weather: string;
      disabled: string;
      neutral?: {
        default: string;
        alt: string;
      };
    };
  }

  // Defines the options available for the palette.
  interface PaletteOptions {
    // Provide backward compatibility to Meshery Cloud UI
    navBar?: string;
    darkJungleGreen?: string;
    lightDarkJungleGreen?: string;
    superLightDarkJungleGreen?: string;
    anakiwa?: string;
    btnBg?: string;
    actionIcon?: string;
    actionIconHover?: string;
    tablebghover?: string;
    btnHover?: string;
    tabmenuhover?: string;
    btnDisabled?: string;
    caribbeanGreen?: string;
    yellowSea?: string;
    keppelGreen?: string;
    pineGreen?: string;
    charcoal?: string;
    cultured?: string;
    white?: string;
    lightWhite?: string;
    superLightWhite?: string;
    darkShadeGray?: string;
    chineseSilver?: string;
    lightGray?: string;
    saffron?: string;
    gray?: string;
    gray97?: string;
    darkSlateGray?: string;
    aliceBlue?: string;
    limedSpruce?: string;
    whiteSmoke?: string;
    slack?: string;
    twitter?: string;
    github?: string;
    youtube?: string;
    docker?: string;
    tableBorder?: string;
    primaryColor?: string;
    darkPrimaryColor?: string;
    slateGray?: string;
    lightSlateGray?: string;
    erieBlack?: string;
    lightErieBlack?: string;
    superLightErieBlack?: string;
    casper?: string;
    lightCasper?: string;
    superLightCasper?: string;
    disabledRow?: string;
    tooltipText?: string;
    solitude?: string;
    ghostWhite?: string;
    black?: string;
    toolBg?: string;
    lightBlue?: string;
    btnDelete?: string;
    btnDeleteHover?: string;
    mesheryAccent?: string;
    cardBorder?: string;
    lighterGray?: string;
    spanishGray?: string;
    steam?: string;
    funnelCloud?: string;
    tropicalRainforest?: string;
    drWhite?: string;
    connected?: string;
    registered?: string;
    discovered?: string;
    ignored?: string;
    deleted?: string;
    maintenance?: string;
    disconnected?: string;
    notFound?: string;
    goshawkGrey?: string;
    border: {
      default: string;
      strong: string;
      brand: string;
      normal: string;
      neutral?: {
        default: string;
        alt: string;
      };
    };
    icon: {
      default: string;
      secondary: string;
      brand: string;
      inverse: string;
      weather: string;
      disabled: string;
      neutral?: {
        default: string;
        alt: string;
      };
    };
  }
}

export const lightModePalette: PaletteOptions = {
  navBar: Colors.navBar.main,
  darkJungleGreen: Colors.DARK_JUNGLE_GREEN,
  lightDarkJungleGreen: alpha(Colors.DARK_JUNGLE_GREEN, 0.8),
  superLightDarkJungleGreen: alpha(Colors.DARK_JUNGLE_GREEN, 0.6),
  anakiwa: Colors.ANAKIWA,
  btnBg: Colors.KEPPEL,
  actionIcon: Colors.CHARCOAL,
  actionIconHover: Colors.DARK_SLATE_GRAY,
  tablebghover: Colors.ALICE_BLUE,
  btnHover: Colors.CARIBBEAN_GREEN,
  tabmenuhover: Colors.DARK_SLATE_GRAY,
  btnDisabled: Colors.charcoal[80],
  caribbeanGreen: Colors.CARIBBEAN_GREEN,
  yellowSea: Colors.YELLOW_SEA,
  keppelGreen: Colors.KEPPEL,
  pineGreen: Colors.PINE_GREEN,
  charcoal: Colors.CHARCOAL,
  cultured: Colors.CULTURED,
  white: Colors.WHITE,
  lightWhite: alpha(Colors.WHITE, 0.8),
  superLightWhite: alpha(Colors.WHITE, 0.6),
  darkShadeGray: Colors.DARK_SHADE_GRAY,
  chineseSilver: Colors.CHINESE_SILVER,
  lightGray: Colors.CHINESE_SILVER,
  saffron: Colors.SAFFRON,
  gray: Colors.GRAY,
  gray97: Colors.GRAY97,
  darkSlateGray: Colors.DARK_SLATE_GRAY,
  aliceBlue: Colors.ALICE_BLUE,
  limedSpruce: Colors.CHARCOAL,
  whiteSmoke: Colors.WHITESMOKE,
  slack: Colors.charcoal[40],
  twitter: Colors.TEAL_BLUE,
  github: Colors.charcoal[20],
  youtube: Colors.charcoal[40],
  docker: Colors.TEAL_BLUE,
  tableBorder: Colors.LIGHT_GRAY,
  primaryColor: Colors.PRIMARY_COLOR,
  darkPrimaryColor: Colors.DARK_PRIMARY_COLOR,
  slateGray: Colors.SLATE_GRAY,
  lightSlateGray: alpha(Colors.SLATE_GRAY, 0.8),
  erieBlack: Colors.EERIE_BLACK,
  lightErieBlack: alpha(Colors.EERIE_BLACK, 0.8),
  superLightErieBlack: alpha(Colors.EERIE_BLACK, 0.6),
  casper: Colors.CASPER,
  lightCasper: alpha(Colors.CASPER, 0.8),
  superLightCasper: alpha(Colors.CASPER, 0.6),
  disabledRow: alpha(Colors.DARK_JUNGLE_GREEN, 0.05),
  tooltipText: Colors.DARK_JUNGLE_GREEN,
  solitude: Colors.charcoal[90],
  ghostWhite: Colors.charcoal[90],
  black: Colors.BLACK,
  toolBg: alpha(Colors.BLACK, 0.2),
  lightBlue: Colors.ALICE_BLUE,
  btnDelete: Colors.charcoal[40],
  btnDeleteHover: Colors.charcoal[30],
  mesheryAccent: Colors.ALICE_BLUE,
  cardBorder: Colors.CHARCOAL,
  lighterGray: Colors.CHARCOAL,
  spanishGray: Colors.charcoal[50],
  steam: Colors.MEDIUM_GREY,
  funnelCloud: Colors.PRIMARY_COLOR,
  tropicalRainforest: Colors.PINE_GREEN,
  drWhite: Colors.SNOW_WHITE,
  connected: Colors.KEPPEL,
  registered: Colors.TEAL_BLUE,
  discovered: Colors.charcoal[80],
  ignored: Colors.DARK_PRIMARY_COLOR,
  deleted: Colors.charcoal[40],
  maintenance: Colors.YELLOW_SEA,
  disconnected: Colors.charcoal[30],
  notFound: Colors.NOT_FOUND,
  goshawkGrey: Colors.CHARCOAL,

  background: {
    default: Colors.charcoal[100],
    secondary: Colors.accentGrey[90],
    tertiary: Colors.accentGrey[80],
    hover: Colors.charcoal[90],
    supplementary: Colors.accentGrey[40],
    blur: {
      heavy: alpha(Colors.charcoal[90], 0.8),
      light: alpha(Colors.charcoal[90], 0.5)
    },
    neutral: {
      default: Colors.charcoal[40],
      hover: Colors.charcoal[30],
      pressed: Colors.charcoal[20]
    },
    inverse: Colors.charcoal[10],
    brand: {
      default: Colors.keppel[40],
      hover: Colors.keppel[50],
      disabled: Colors.charcoal[90],
      pressed: Colors.keppel[60],
      secondary: Colors.keppel[50],
      tertiary: Colors.keppel[70]
    },
    graphics: {
      default: Colors.carribean[30]
    },
    cta: {
      default: Colors.saffron[40],
      hover: Colors.saffron[50],
      pressed: Colors.saffron[60],
      secondary: Colors.saffron[60],
      tertiary: Colors.saffron[70]
    },
    info: {
      default: Colors.blue[40],
      hover: Colors.blue[20],
      pressed: Colors.blue[10],
      secondary: Colors.blue[60],
      tertiary: Colors.blue[70]
    },
    success: {
      default: Colors.green[30],
      hover: Colors.green[20],
      pressed: Colors.green[10],
      secondary: Colors.green[60],
      tertiary: Colors.green[70]
    },
    warning: {
      default: Colors.yellow[30],
      hover: Colors.yellow[20],
      pressed: Colors.yellow[10],
      secondary: Colors.yellow[60],
      tertiary: Colors.yellow[70]
    },
    error: {
      default: Colors.red[30],
      hover: Colors.red[20],
      pressed: Colors.red[10],
      secondary: Colors.red[60],
      tertiary: Colors.red[70]
    },
    code: Colors.charcoal[90],
    constant: {
      white: Colors.accentGrey[100],
      disabled: Colors.charcoal[70]
    }
  },
  text: {
    default: Colors.charcoal[10],
    secondary: Colors.charcoal[40],
    tertiary: Colors.charcoal[50],
    disabled: Colors.charcoal[70],
    inverse: Colors.charcoal[100],
    brand: Colors.keppel[40],
    info: Colors.blue[40],
    success: Colors.green[30],
    warning: Colors.yellow[30],
    error: Colors.red[30],
    neutral: {
      default: Colors.charcoal[40],
      alt: Colors.charcoal[40]
    },
    constant: {
      white: Colors.charcoal[100],
      disabled: Colors.charcoal[50]
    }
  },
  border: {
    default: Colors.charcoal[90],
    strong: Colors.charcoal[30],
    brand: Colors.keppel[40],
    normal: Colors.charcoal[60],
    neutral: {
      default: Colors.charcoal[40],
      alt: Colors.charcoal[40]
    }
  },
  icon: {
    default: Colors.accentGrey[10],
    secondary: Colors.charcoal[40],
    brand: Colors.keppel[40],
    inverse: Colors.charcoal[100],
    weather: Colors.accentGrey[50],
    disabled: Colors.charcoal[70],
    neutral: {
      default: Colors.charcoal[40],
      alt: Colors.charcoal[40]
    }
  }
};

export const darkModePalette: PaletteOptions = {
  background: {
    default: Colors.charcoal[10],
    secondary: Colors.accentGrey[10],
    tertiary: Colors.accentGrey[30],
    hover: Colors.charcoal[20],
    supplementary: Colors.accentGrey[40],
    blur: {
      heavy: alpha(Colors.charcoal[10], 0.8),
      light: alpha(Colors.charcoal[10], 0.5)
    },
    neutral: {
      default: Colors.accentGrey[100],
      hover: Colors.charcoal[90],
      pressed: Colors.charcoal[80]
    },
    brand: {
      default: Colors.keppel[40],
      hover: Colors.keppel[50],
      disabled: Colors.charcoal[20],
      pressed: Colors.keppel[60],
      secondary: Colors.keppel[20],
      tertiary: Colors.keppel[10]
    },
    graphics: {
      default: Colors.carribean[40]
    },
    cta: {
      default: Colors.saffron[40],
      hover: Colors.saffron[50],
      pressed: Colors.saffron[60],
      secondary: Colors.saffron[20],
      tertiary: Colors.saffron[10]
    },
    info: {
      default: Colors.blue[40],
      hover: Colors.blue[50],
      pressed: Colors.blue[60],
      secondary: Colors.blue[20],
      tertiary: Colors.blue[10]
    },
    success: {
      default: Colors.green[40],
      hover: Colors.green[50],
      pressed: Colors.green[60],
      secondary: Colors.green[20],
      tertiary: Colors.green[10]
    },
    warning: {
      default: Colors.yellow[40],
      hover: Colors.yellow[50],
      pressed: Colors.yellow[60],
      secondary: Colors.yellow[20],
      tertiary: Colors.yellow[10]
    },
    error: {
      default: Colors.red[40],
      hover: Colors.red[50],
      pressed: Colors.red[60],
      secondary: Colors.red[20],
      tertiary: Colors.red[10]
    },
    code: Colors.accentGrey[90],
    constant: {
      white: Colors.accentGrey[100],
      disabled: Colors.charcoal[70]
    }
  },
  text: {
    default: Colors.charcoal[100],
    secondary: Colors.charcoal[40],
    tertiary: Colors.charcoal[60],
    disabled: Colors.charcoal[70],
    inverse: Colors.charcoal[10],
    brand: Colors.keppel[40],
    info: Colors.blue[40],
    success: Colors.green[40],
    warning: Colors.yellow[40],
    error: Colors.red[40],
    neutral: {
      default: Colors.accentGrey[100],
      alt: Colors.keppel[40]
    },
    constant: {
      white: Colors.charcoal[100],
      disabled: Colors.charcoal[50]
    }
  },
  border: {
    default: Colors.accentGrey[10],
    strong: Colors.accentGrey[60],
    brand: Colors.keppel[40],
    normal: Colors.accentGrey[30],
    neutral: {
      default: Colors.accentGrey[100],
      alt: Colors.keppel[40]
    }
  },

  icon: {
    default: Colors.accentGrey[90],
    secondary: Colors.charcoal[80],
    brand: Colors.keppel[40],
    inverse: Colors.charcoal[10],
    weather: Colors.saffron[40],
    disabled: Colors.charcoal[50],
    neutral: {
      default: Colors.accentGrey[100],
      alt: Colors.keppel[40]
    }
  }
};
