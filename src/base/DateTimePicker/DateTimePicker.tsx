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
const LazyDateTimePicker = React.lazy(async () => {
  const [{ AdapterDateFns }, { LocalizationProvider }, { DateTimePicker: MuiDateTimePicker }] =
    await Promise.all([
      import('@mui/x-date-pickers/AdapterDateFns'),
      import('@mui/x-date-pickers/LocalizationProvider'),
      import('@mui/x-date-pickers/DateTimePicker')
    ]);

  const ResolvedDateTimePicker = React.forwardRef<HTMLDivElement, MuiDateTimePickerProps>(
    (props, ref) => (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDateTimePicker {...props} ref={ref} />
      </LocalizationProvider>
    )
  );
  ResolvedDateTimePicker.displayName = 'ResolvedDateTimePicker';

  return { default: ResolvedDateTimePicker };
});

const DateTimePicker = React.forwardRef<HTMLDivElement, MuiDateTimePickerProps>((props, ref) => (
  // `null` rather than a spinner: the chunk resolves in a frame or two and a
  // flashing placeholder inside a form field reads as a bug.
  <React.Suspense fallback={null}>
    <LazyDateTimePicker {...props} ref={ref} />
  </React.Suspense>
));
DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
