import { SistentThemeBase } from './types/SistentTheme';
import { DEFAULT_COLORS } from './utils/defaultColors';

export const DEFAULT_THEME: SistentThemeBase = {
  dir: 'ltr',
  colorScheme: 'light',
  white: '#FFF',
  black: '#000',
  primaryColor: 'green',
  fontFamily: undefined,
  lineHeight: undefined,
  primaryShade: 0,
  other: {},
  components: {},
  colors: DEFAULT_COLORS,
  fontSizes: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: ''
  },
  radius: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: ''
  },
  spacing: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: ''
  },
  breakpoints: {
    xs: '0',
    sm: '600',
    md: '960',
    lg: '1280',
    xl: '1920'
  },
  shadows: {
    xs: '',
    sm: '',
    md: '',
    lg: '',
    xl: ''
  },
  headings: {
    fontFamily: undefined,
    fontWeight: undefined,
    sizes: {
      h1: {
        fontSize: '',
        fontWeight: undefined,
        lineHeight: undefined
      },
      h2: {
        fontSize: '',
        fontWeight: undefined,
        lineHeight: undefined
      },
      h3: {
        fontSize: '',
        fontWeight: undefined,
        lineHeight: undefined
      },
      h4: {
        fontSize: '',
        fontWeight: undefined,
        lineHeight: undefined
      },
      h5: {
        fontSize: '',
        fontWeight: undefined,
        lineHeight: undefined
      },
      h6: {
        fontSize: '',
        fontWeight: undefined,
        lineHeight: undefined
      }
    }
  }
};
