import {
  createCustomTheme,
  readableTextColor,
  SistentDefaultPrimitivePaletteLight
} from '../theme';

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
