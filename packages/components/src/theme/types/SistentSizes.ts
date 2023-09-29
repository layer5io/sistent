import * as t from 'io-ts';

export const SistentSizeType = t.union([
  t.literal('xs'),
  t.literal('sm'),
  t.literal('md'),
  t.literal('lg'),
  t.literal('xl'),
  t.string
]);

export type SistentSize = t.TypeOf<typeof SistentSizeType>;

export const SistentNumberSizeType = t.union([SistentSizeType, t.number]);

export type SistentNumberSize = t.TypeOf<typeof SistentNumberSizeType>;

// Create a Keyof codec for known keys
const knownSizes = t.keyof({
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null
});

// Create the SistentSizesType using the known keys
export const SistentSizesType = t.record(knownSizes, t.string);

export type SistentSizes = t.TypeOf<typeof SistentSizesType>;
