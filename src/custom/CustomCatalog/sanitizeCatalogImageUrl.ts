/**
 * Normalizes a catalog snapshot/image URL for safe rendering.
 *
 * Legacy catalog records stored the design snapshot URL wrapped in stray '%'
 * delimiters, e.g. "%https://raw.githubusercontent.com/org/repo%/master/x.png".
 * Rendered verbatim in an `<img src>`, the leading '%' makes the browser treat
 * the value as a path relative to the current page and issue a broken request
 * against the app origin (HTTP 400). This strips the stray delimiters (while
 * preserving genuine `%XX` percent-encoding) and returns the result only when
 * it is an absolute http(s) URL; otherwise it returns `undefined` so callers
 * can fall back to a placeholder instead of requesting a malformed URL.
 *
 * This lives in its own dependency-free leaf module (rather than inline in
 * `Helper.ts`) so `src/index.tsx` can re-export it explicitly for the bundled
 * d.ts. `Helper.ts` imports the untyped `js-yaml`, which would crash the
 * rollup-plugin-dts declaration build the moment the entry re-exports from it;
 * this leaf has no untyped imports. Same rationale as `TableActions` vs
 * `ResponsiveDataTable`.
 */
export const sanitizeCatalogImageUrl = (rawUrl?: string): string | undefined => {
  if (typeof rawUrl !== 'string') {
    return undefined;
  }
  // Remove only stray '%' that are not part of a valid %XX escape sequence.
  const cleaned = rawUrl.trim().replace(/%(?![0-9a-fA-F]{2})/g, '');
  return /^https?:\/\//i.test(cleaned) ? cleaned : undefined;
};
