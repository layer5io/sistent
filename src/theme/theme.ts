import { alpha, createTheme, darken, PaletteMode } from '@mui/material';
import { components } from './components';
import { darkModePalette, lightModePalette, ThemePalette } from './palette';
import { typography } from './typography';

import _ from 'lodash';

export const drawerWidth = 240;

/**
 * Primitive palette defines the raw, brand-level colors used in the UI.
 * These are foundational tokens that never directly appear in components
 * without being mapped to semantic tokens (like `buttonBackground` or `navbarText`).
 *
 * Layer 2 ( ui )  tokens should reference these primitives to keep themes
 * consistent, brandable, and easy to override.
 */
export type PrimitivePalette = {
  /**
   * AppNavigation bar background color.
   * Examples:
   * - Top navigation bar
   *   - Side navigation drawer
   *   - Bottom navigation bar
   *   - Tab headers
   * Should be visually distinct from `background` to ensure
   * navigation elements stand out.
   */
  navigationBar: string;

  /**
   * Main brand color used for the most prominent UI elements.
   * Examples:
   * - Primary button backgrounds (`primaryButtonBackground`)
   * - Active navigation bar backgrounds
   * - Key highlights in charts or graphs
   * - Marketing banners
   *
   * Choose a color that instantly represents your brand identity.
   */
  primary: string;

  /**
   * High-contrast variant of `primary`, used for text/icons placed
   * directly on a primary-colored background.
   * Examples:
   * - Text on primary buttons (`primaryButtonText`)
   * - Icons in a primary-colored navbar
   * - Labels in a badge using primary as the background
   *
   * Should pass WCAG contrast guidelines when layered on `primary`.
   */
  primaryInverted: string;

  /**
   * Secondary brand color for less prominent but still important UI elements.
   * Examples:
   * - Secondary buttons
   * - Tab headers
   * - Secondary navigation bars
   * - Sidebar highlights
   *
   * Often complements `primary` without competing for attention.
   */
  secondary: string;

  /**
   * High-contrast variant of `secondary`, used for text/icons
   * placed on a secondary-colored background.
   * Examples:
   * - Text on secondary buttons
   * - Icons in a secondary navbar
   * - Badge text over a secondary background
   */
  secondaryInverted: string;

  /**
   * Attention-grabbing color for emphasis and high-visibility actions.
   * Often more vibrant than primary/secondary.
   * Examples:
   * - Hyperlinks
   * - Special call-to-action buttons
   * - Active tab underline
   * - Notification counts or badges
   * - Highlighted form fields
   *
   * Should be visually distinct from `primary`.
   */
  accent: string;

  /**
   * High-contrast variant of `accent`, used for text/icons placed
   * on an accent-colored background.
   * Examples:
   * - Text in a promotional banner with accent background
   * - Badge text on an accent background
   * - Icons inside accent-highlighted buttons
   */
  accentInverted: string;

  /**
   * Main surface color for the app's UI.
   * Examples:
   * - App background
   * - Card backgrounds
   * - Modal and panel surfaces
   *
   * Typically neutral (light or dark) to maintain good readability.
   */
  background: string;

  /**
   * Default text color for content placed on `background`.
   * Examples:
   * - Paragraph text
   * - Headings
   * - Default icon color on white/light backgrounds
   *
   * Should maintain high contrast with `background`.
   */
  foreground: string;
};

import * as Colors from './colors';

/**
 * Layer5 ( primitives ) defines the raw, brand-level colors used in the UI.
 */
export const SistentDefaultPrimitivePaletteLight: PrimitivePalette = {
  navigationBar: '#252e31', // used for app navigation bar background

  primary: Colors.KEPPEL, // maps to background.brand.default, success.default
  primaryInverted: Colors.charcoal[100], // used for text on KEPL background

  secondary: Colors.DARK_SLATE_GRAY, // used in secondary.main, text.secondary, borders
  secondaryInverted: Colors.charcoal[100], // for text on secondary-colored backgrounds

  accent: Colors.saffron[40], // from background.cta.default
  accentInverted: Colors.charcoal[100], // text on accent

  background: Colors.charcoal[100], // app background, cards, tabs
  foreground: Colors.charcoal[10] // primary text color on background
};

export const SistentDefaultPrimitivePaletteDark: PrimitivePalette = {
  navigationBar: '#252e31', // used for app navigation bar background

  primary: Colors.KEPPEL, // maps to background.brand.default, success.default
  primaryInverted: Colors.charcoal[100], // used for text on KEPL background

  secondary: Colors.DARK_SLATE_GRAY, // used in secondary.main, text.secondary, borders
  secondaryInverted: Colors.charcoal[100], // for text on secondary-colored backgrounds

  accent: Colors.saffron[40], // from background.cta.default
  accentInverted: Colors.charcoal[100], // text on accent

  background: Colors.charcoal[10], // app background, cards, tabs
  foreground: Colors.charcoal[100] // primary text color on background
};

export const createCustomTheme = (mode: PaletteMode, primitives?: PrimitivePalette) => {
  const basePalette = mode == 'light' ? lightModePalette : darkModePalette;
  const defaultPrimitives =
    mode == 'light' ? SistentDefaultPrimitivePaletteLight : SistentDefaultPrimitivePaletteDark;
  const p = primitives ? _.merge({}, defaultPrimitives, primitives) : undefined;

  const customBrandedTheme: Partial<ThemePalette> = p
    ? {
        surface: {
          primary: p.background,
          secondary: darken(p.background, 0.05),
          tertiary: darken(p.background, 0.1),
          elevated: p.background,
          overlay: alpha(p.background, 0.8),

          tint: `linear-gradient(90deg, ${alpha(p.secondary, 0.8)} 0%, ${p.secondary} 100%)`,
          inverse: p.foreground
        },

        interactive: {
          primary: p.primary,
          secondary: p.secondary,
          tertiary: p.primaryInverted,
          hover: alpha(p.primary, 0.85),
          pressed: alpha(p.primary, 0.7),
          disabled: darken(p.background, 0.5)
        },

        navigation: {
          primary: p.navigationBar,
          secondary: p.secondary,
          active: p.primary,
          hover: alpha(p.primary, 0.85)
        },

        // @deprecated ( use semantic tokens instead )
        primary: {
          main: p.primary
        },

        // @deprecated ( use semantic tokens instead )
        secondary: {
          main: p.secondary
        },

        // @ deprecated ( use surface tokens instead )
        background: {
          default: p.background,
          secondary: alpha(p.background, 0.96),
          tertiary: alpha(p.background, 0.92),
          tabs: p.background, // TODO: rename to semantic token later
          card: p.background,
          elevatedComponents: p.primaryInverted,
          hover: alpha(p.background, 0.9),
          supplementary: alpha(p.foreground, 0.4),
          blur: {
            heavy: alpha(p.background, 0.8),
            light: alpha(p.background, 0.5)
          },
          neutral: {
            default: p.foreground,
            hover: alpha(p.foreground, 0.7),
            pressed: alpha(p.foreground, 0.5)
          },
          inverse: p.primaryInverted,
          brand: {
            default: p.primary,
            hover: alpha(p.primary, 0.85),
            disabled: alpha(p.primary, 0.4),
            pressed: alpha(p.primary, 0.7),
            secondary: alpha(p.primary, 0.85),
            tertiary: alpha(p.primary, 0.65)
          },
          graphics: {
            default: p.accent
          },
          cta: {
            default: p.accent,
            hover: alpha(p.accent, 0.85),
            pressed: alpha(p.accent, 0.7),
            secondary: alpha(p.accent, 0.6),
            tertiary: alpha(p.accent, 0.5)
          },

          surfaces: p.background,

          appNavigationBar: p.navigationBar,
          secondaryAppNavigationBar: p.secondary
        },
        text: {
          default: p.foreground,
          secondary: alpha(p.foreground, 0.7),
          tertiary: alpha(p.foreground, 0.5),
          disabled: alpha(p.foreground, 0.4),
          inverse: p.background,
          // @deprecated
          brand: p.primary,
          info: p.accent,
          success: p.primary,
          warning: p.secondary,
          error: p.accent,
          // @deprecated
          neutral: {
            default: alpha(p.foreground, 0.7),
            alt: alpha(p.foreground, 0.7)
          },
          // @deprecated
          constant: {
            white: p.primaryInverted,
            disabled: alpha(p.foreground, 0.4)
          }
        },
        border: {
          default: alpha(p.foreground, 0.2),
          strong: alpha(p.foreground, 0.7),
          brand: p.primary,
          normal: alpha(p.foreground, 0.4),
          // @deprecated
          neutral: {
            default: alpha(p.foreground, 0.4),
            alt: alpha(p.foreground, 0.4)
          }
        },
        icon: {
          default: alpha(p.foreground, 0.9),
          dualTone: p.primary,
          dualToneInverse: p.primaryInverted,
          secondary: alpha(p.foreground, 0.8),
          // @deprecated
          brand: p.primary,
          inverse: p.background,
          // @deprecated
          weather: alpha(p.foreground, 0.5),
          disabled: alpha(p.foreground, 0.4),
          //@deprecated
          neutral: {
            default: alpha(p.foreground, 0.9),
            alt: alpha(p.foreground, 0.8)
          }
        }
      }
    : {};

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
