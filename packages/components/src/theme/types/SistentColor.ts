import * as t from 'io-ts';
import { TupleCodec } from './Tuple';

const DefaultSistentColorType = t.union([
  t.literal('dark'),
  t.literal('gray'),
  t.literal('red'),
  t.literal('pink'),
  t.literal('grape'),
  t.literal('violet'),
  t.literal('indigo'),
  t.literal('blue'),
  t.literal('cyan'),
  t.literal('green'),
  t.literal('lime'),
  t.literal('yellow'),
  t.literal('orange'),
  t.literal('teal'),
  t.string
]);

export type DefaultSistentColor = t.TypeOf<typeof DefaultSistentColorType>;

const SistentThemeColorsOverrideType = t.record(t.string, TupleCodec(t.string, 10));

export type SistentThemeColorsOverride = t.TypeOf<typeof SistentThemeColorsOverrideType>;

export const SistentThemeColorsType = t.union([
  SistentThemeColorsOverrideType,
  t.record(DefaultSistentColorType, TupleCodec(t.string, 10))
]);

export type SistentThemeColors = t.TypeOf<typeof SistentThemeColorsType>;

export type SistentColor = keyof SistentThemeColors;
