import {
  createCustomTheme,
  readableTextColor,
  SistentDefaultPrimitivePaletteLight
} from '../theme';
import { MuiButton } from '../theme/components/button.modifier';

const LIGHT_INK = SistentDefaultPrimitivePaletteLight.primaryInverted; // charcoal[100] ≈ near-white
const DARK_INK = SistentDefaultPrimitivePaletteLight.foreground; // charcoal[10] ≈ near-black

describe('readableTextColor', () => {
  it('returns light ink on a dark background', () => {
    expect(readableTextColor('#000000')).toBe(LIGHT_INK);
  });

  it('returns dark ink on a light background', () => {
    expect(readableTextColor('#FFFFFF')).toBe(DARK_INK);
  });

  it('honors caller-supplied inks', () => {
    expect(readableTextColor('#000000', '#fafafa', '#111111')).toBe('#fafafa');
  });

  it('falls back to dark ink for an unparseable color', () => {
    expect(readableTextColor('not-a-color')).toBe(DARK_INK);
  });
});

describe('createCustomTheme contrast derivation', () => {
  it('derives readable body text when a brand omits the contrast tokens', () => {
    // Only base colors provided; background is dark. The derived foreground
    // (text.default) must be light so text stays readable — not the Layer5
    // default dark ink.
    const theme = createCustomTheme('light', {
      navigationBar: '#101010',
      primary: '#003a99',
      secondary: '#001f4d',
      accent: '#3a99ff',
      background: '#000000'
    });

    expect(theme.palette.text.default).toBe(readableTextColor('#000000'));
    expect(theme.palette.text.default).toBe(LIGHT_INK);
  });

  it('passes an explicitly-specified contrast token through unchanged', () => {
    const theme = createCustomTheme('light', {
      primary: '#003a99',
      secondary: '#001f4d',
      accent: '#3a99ff',
      navigationBar: '#101010',
      background: '#000000',
      foreground: '#ff0000'
    });

    expect(theme.palette.text.default).toBe('#ff0000');
  });

  it('keeps default contrast tokens for base colors the caller did not customize', () => {
    // Only `background` is overridden, so its contrast token (foreground)
    // re-derives — but `primary` is untouched, so its contrast token must
    // keep the default ink rather than silently re-deriving from KEPPEL.
    const theme = createCustomTheme('light', { background: '#000000' });

    // background customized -> body text re-derived to stay readable
    expect(theme.palette.text.default).toBe(LIGHT_INK);
    // primary untouched -> its contrast token (mapped to elevatedComponents)
    // is preserved at the default, not recolored
    expect(theme.palette.background.elevatedComponents).toBe(
      SistentDefaultPrimitivePaletteLight.primaryInverted
    );
  });

  it('accepts a partial palette without a type cast', () => {
    // Compiles only because the public API takes Partial<PrimitivePalette>.
    const theme = createCustomTheme('light', { primary: '#003a99' });
    expect(theme.palette.mode).toBe('light');
  });

  it('returns a valid MUI theme with no custom palette', () => {
    const theme = createCustomTheme('light');
    expect(theme.palette.mode).toBe('light');
  });
});

describe('MuiButton contained honors the semantic color prop', () => {
  // The MuiButton override function computes styles from the active theme.
  // Call it directly (MUI would call it as `root({ theme, ownerState })`) so the
  // assertions read the resolved backgroundColor per contained variant.
  const rootStyles = (mode: 'light' | 'dark') => {
    const theme = createCustomTheme(mode);
    const root = MuiButton.styleOverrides!.root as (arg: { theme: typeof theme }) => Record<
      string,
      { backgroundColor?: string; ['&:hover']?: { backgroundColor?: string } }
    >;
    return { theme, styles: root({ theme }) };
  };

  it('paints color="error" contained buttons with the error background, not the brand (keppel)', () => {
    const { theme, styles } = rootStyles('light');
    const contained = styles['&.MuiButton-contained'];
    const containedError = styles['&.MuiButton-containedError'];

    expect(containedError).toBeDefined();
    // Uses the semantic error background…
    expect(containedError.backgroundColor).toBe(theme.palette.background.error.default);
    expect(containedError['&:hover']?.backgroundColor).toBe(
      theme.palette.background.error.hover
    );
    // …and is NOT the brand background that `&.MuiButton-contained` sets — the
    // regression that made `<Button variant="contained" color="error">` green.
    expect(containedError.backgroundColor).not.toBe(contained.backgroundColor);
  });

  it('also honors success and warning contained buttons', () => {
    const { theme, styles } = rootStyles('light');
    expect(styles['&.MuiButton-containedSuccess'].backgroundColor).toBe(
      theme.palette.background.success.default
    );
    expect(styles['&.MuiButton-containedWarning'].backgroundColor).toBe(
      theme.palette.background.warning.default
    );
  });

  it('resolves the error background in dark mode too', () => {
    const { theme, styles } = rootStyles('dark');
    expect(styles['&.MuiButton-containedError'].backgroundColor).toBe(
      theme.palette.background.error.default
    );
  });
});
