import type { DateTimePickerProps as MuiDateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';
import React from 'react';

/**
 * `@mui/x-date-pickers` is declared an OPTIONAL peer dependency, and most
 * consumers never render a date picker, so most consumers do not install it.
 * Importing it at module scope contradicted that: this module is reached from the
 * package barrel, so merely writing `import { anything } from '@sistent/sistent'`
 * executed a top-level require of the optional package and threw
 * `Cannot find module '@mui/x-date-pickers/AdapterDateFns'` for anyone without
 * it. In Kanvas that took out four unrelated Jest suites on a clean install, with
 * a message pointing at sistent rather than at the missing peer.
 *
 * Resolving the picker on first render keeps the optional dependency genuinely
 * optional: the cost is paid only by code that actually renders one, which is
 * what `peerDependenciesMeta.optional` already advertises.
 */
const OPTIONAL_PEERS = '@mui/x-date-pickers and date-fns';

/**
 * sistent's own props contract, deliberately not an alias of the peer's
 * `DateTimePickerProps`.
 *
 * The runtime import above is deferred so the optional peer stays optional, but a
 * type has no lazy form. Typing the exported component with MUI's props left the
 * declaration bundle importing the peer's `DateTimePickerProps`, which a consumer
 * who skipped the optional peer cannot resolve: `TS2307` under
 * `skipLibCheck: false`, and a silent `any` under `skipLibCheck: true`. See
 * `src/__testing__/publishedTypeSurfaceDependencies.test.ts`.
 *
 * Note that dropping the barrel's type re-export was not sufficient on its own -
 * the exported component's own declaration was a second reference to the peer,
 * and kept the import alive by itself.
 *
 * The named props are the ones sistent checks. The index signature keeps every
 * other picker prop accepted and forwarded, so the pass-through is described
 * without naming a package the consumer may not have.
 */
export interface DateTimePickerProps {
  label?: React.ReactNode;
  value?: Date | null;
  defaultValue?: Date | null;
  /**
   * Trailing `...rest: never[]` rather than a named second parameter: MUI passes a
   * validation context as the second argument, and spelling it here would make a
   * handler that ignores it - which every call site in this repo does - the only
   * assignable shape, rejecting the two-parameter handlers MUI's own type allows.
   */
  onChange?: (value: Date | null, ...rest: never[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  minDateTime?: Date;
  maxDateTime?: Date;
  format?: string;
  className?: string;
  [prop: string]: unknown;
}

/**
 * Annotated explicitly rather than left to `React.forwardRef<T, P>` inference.
 * That helper returns `ForwardRefExoticComponent<PropsWithoutRef<P> & ...>`, and
 * for a `P` carrying a string index signature `PropsWithoutRef` resolves to
 * `Omit<P, 'ref'>`, whose `keyof P` is `string | number` - collapsing the whole
 * interface to `{ [x: string]: unknown }` and discarding every named prop's type.
 * `<DateTimePicker value="not a date" />` would then compile silently, which is
 * the same unchecked-prop failure this file exists to avoid.
 */
type DateTimePickerComponent = React.ForwardRefExoticComponent<
  DateTimePickerProps & React.RefAttributes<HTMLDivElement>
>;

const LazyDateTimePicker = React.lazy(async () => {
  const [{ AdapterDateFns }, { LocalizationProvider }, { DateTimePicker: MuiDateTimePicker }] =
    await Promise.all([
      import('@mui/x-date-pickers/AdapterDateFns'),
      import('@mui/x-date-pickers/LocalizationProvider'),
      import('@mui/x-date-pickers/DateTimePicker')
    ]).catch((cause: unknown) => {
      // Deferring the resolution also defers the failure, so the raw
      // module-not-found surfaces mid-render from inside a promise, far from
      // any import statement. Naming the peer here is the whole reason the
      // eager import was worth trading away — an unactionable async crash is
      // not an improvement on an unactionable sync one.
      throw new Error(
        `<DateTimePicker> requires the optional peer dependencies ${OPTIONAL_PEERS}. ` +
          `Install them, or do not render <DateTimePicker> / <UniversalFilter datePicker>.`,
        { cause }
      );
    });

  const ResolvedDateTimePicker: DateTimePickerComponent = React.forwardRef<
    HTMLDivElement,
    DateTimePickerProps
  >((props, ref) => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDateTimePicker {...(props as MuiDateTimePickerProps)} ref={ref} />
    </LocalizationProvider>
  ));
  ResolvedDateTimePicker.displayName = 'ResolvedDateTimePicker';

  return { default: ResolvedDateTimePicker };
});

const DateTimePicker: DateTimePickerComponent = React.forwardRef<
  HTMLDivElement,
  DateTimePickerProps
>((props, ref) => (
  // `null` rather than a spinner: the chunk resolves in a frame or two and a
  // flashing placeholder inside a form field reads as a bug.
  <React.Suspense fallback={null}>
    <LazyDateTimePicker {...props} ref={ref} />
  </React.Suspense>
));
DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
