import { sanitizeCatalogImageUrl } from '../custom/CustomCatalog/Helper';

describe('sanitizeCatalogImageUrl', () => {
  it('passes through a well-formed absolute https URL', () => {
    const url =
      'https://raw.githubusercontent.com/layer5labs/meshery-extensions-packages/master/action-assets/design-assets/34fe3846-4b90-4558-914c-8e57caefd52f-light.png';
    expect(sanitizeCatalogImageUrl(url)).toBe(url);
  });

  it("strips stray '%' delimiters from a legacy snapshot URL", () => {
    // Legacy catalog records stored the snapshot URL wrapped in '%' delimiters.
    // Rendered verbatim as an <img src> the leading '%' makes the browser
    // request it relative to the app origin, producing HTTP 400.
    const malformed =
      '%https://raw.githubusercontent.com/meshery-extensions/meshery-extensions-packages%/master/action-assets/design-assets/34fe3846-4b90-4558-914c-8e57caefd52f-light.png';
    expect(sanitizeCatalogImageUrl(malformed)).toBe(
      'https://raw.githubusercontent.com/meshery-extensions/meshery-extensions-packages/master/action-assets/design-assets/34fe3846-4b90-4558-914c-8e57caefd52f-light.png'
    );
  });

  it('preserves genuine %XX percent-encoding', () => {
    expect(sanitizeCatalogImageUrl('https://example.com/a%20b.png')).toBe(
      'https://example.com/a%20b.png'
    );
  });

  it('returns undefined for non-absolute or non-string values', () => {
    expect(sanitizeCatalogImageUrl('/relative/path.png')).toBeUndefined();
    expect(sanitizeCatalogImageUrl('%relative%/thing.png')).toBeUndefined();
    expect(sanitizeCatalogImageUrl('')).toBeUndefined();
    expect(sanitizeCatalogImageUrl(undefined)).toBeUndefined();
    expect(sanitizeCatalogImageUrl(null as unknown as string)).toBeUndefined();
  });
});
