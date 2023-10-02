import * as t from 'io-ts';
import { ColorSchemeType } from './ColorTheme';
import { DeepPartial } from './DeepPartial';
import { SistentThemeColorsType } from './SistentColor';
import { SistentSizesType } from './SistentSizes';

const SISTENT_SIZES = {
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null
};

interface ThemeComponent {}

export type SistentThemeOther = Record<string, any>;
export type SistentThemeComponents = Record<string, ThemeComponent>;

/*
export type HeadingStyle = {
    fontSize: string;
    fontWeight: CSSProperties['fontWeight'];
    lineHeight: CSSProperties['lineHeight'];
}
*/

const HeadingStyleType = t.type({
  fontSize: t.string,
  fontWeight: t.string,
  lineHeight: t.string
});

const HeadingsType = t.type({
  fontFamily: t.string,
  fontWeight: t.string,
  sizes: t.type({
    h1: HeadingStyleType,
    h2: HeadingStyleType,
    h3: HeadingStyleType,
    h4: HeadingStyleType,
    h5: HeadingStyleType,
    h6: HeadingStyleType
  })
});

export const ShadeType = t.keyof({
  '0': null,
  '1': null,
  '2': null,
  '3': null,
  '4': null,
  '5': null,
  '6': null,
  '7': null,
  '8': null,
  '9': null
});

type Shade = t.TypeOf<typeof ShadeType>;
/**
 * type Shade = keyof typeof allowedShades;
const allowedShades = {
    0: true, 1: true, 2: true, 3: true, 4: true,
    5: true, 6: true, 7: true, 8: true, 9: true,
};

type FontFamilyType = CSSProperties['fontFamily'];
type LineHeightType = CSSProperties['lineHeight'];
*/

const SistentPrimaryShade = t.type({
  light: ShadeType,
  dark: ShadeType
});

const SistentThemeType = t.type({
  dir: t.union([t.literal('ltr'), t.literal('rtl')]),
  fontFamily: t.string,
  lineHeight: t.string,
  primaryShade: t.union([ShadeType, SistentPrimaryShade]),
  other: t.record(t.string, t.any),
  white: t.string,
  black: t.string,
  components: t.record(t.string, t.unknown),
  colors: t.record(t.string, t.tuple([t.string, t.number])),
  primaryColor: t.keyof(SistentThemeColorsType),
  colorScheme: ColorSchemeType,
  fontSizes: SistentSizesType,
  radius: SistentSizesType,
  spacing: SistentSizesType,
  breakpoints: SistentSizesType,
  shadows: t.record(t.keyof(SISTENT_SIZES), t.string),
  headings: HeadingsType
});

export type SistentTheme = t.TypeOf<typeof SistentThemeType>;

export type SistentThemeBase = Omit<SistentTheme, 'fn'>;

export type SistentThemeOverride = DeepPartial<Omit<SistentThemeBase, 'other' | 'components'>> &
  Partial<Pick<SistentThemeBase, 'other' | 'components'>>;
