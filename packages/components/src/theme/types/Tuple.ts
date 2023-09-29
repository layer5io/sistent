import * as t from 'io-ts';

export function TupleCodec<T extends t.Mixed>(itemCodec: T, length: number): t.Type<T[]> {
  return new t.Type(
    `Tuple<${itemCodec.name}, ${length}>`,
    (input: unknown): input is T[] => {
      if (Array.isArray(input) && input.length === length) {
        return input.every((item) => itemCodec.is(item));
      }
      return false;
    },
    (input, context) => {
      if (Array.isArray(input) && input.length === length) {
        return t.success(input);
      }
      return t.failure(input, context);
    },
    t.identity
  );
}
