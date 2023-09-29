export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (...args: infer Args) => infer Return
    ? (...args: Args) => DeepPartial<Return>
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};
