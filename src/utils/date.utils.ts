/**
 * Calendar arithmetic, kept dependency-free on purpose.
 *
 * These replace the `date-fns` helpers `UniversalFilter` used to import at
 * module scope. `date-fns` is an OPTIONAL peer dependency, so that import made
 * `import { anything } from '@sistent/sistent'` throw `Cannot find module
 * 'date-fns'` for every consumer that took the "optional" at its word — the
 * barrel reaches `UniversalFilter`, and the import ran before any component
 * rendered.
 *
 * Deliberately a leaf module with no imports at all (not part of
 * `time.utils.tsx`, which pulls in `moment` and a React component): pure date
 * arithmetic should be reachable without dragging a rendering stack behind it.
 *
 * Semantics match `date-fns` exactly, including end-of-month clamping.
 */

/**
 * Subtracts whole days from a date, leaving the original untouched.
 *
 * Uses local-time day arithmetic rather than subtracting `n * 86400000` ms, so a
 * range spanning a DST boundary still lands on the same wall-clock time instead
 * of drifting by an hour.
 */
export const subtractDays = (date: Date, amount: number): Date => {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() - amount);
  return result;
};

/**
 * Subtracts whole months from a date, clamping to the last day of the target
 * month rather than rolling over into the next one.
 *
 * `new Date(2025, 2, 31).setMonth(1)` yields March 3rd, not February 28th,
 * because JS normalizes the overflow. The day-of-month is therefore parked at 1
 * for the month arithmetic and restored afterwards, clamped to the target
 * month's length — so "last 3 months" from May 31st is February 28th, not
 * March 3rd.
 */
export const subtractMonths = (date: Date, amount: number): Date => {
  const result = new Date(date.getTime());
  const dayOfMonth = result.getDate();

  result.setDate(1);
  result.setMonth(result.getMonth() - amount);

  // Day 0 of the following month is the last day of this one.
  const lastDayOfTargetMonth = new Date(result.getFullYear(), result.getMonth() + 1, 0).getDate();
  result.setDate(Math.min(dayOfMonth, lastDayOfTargetMonth));

  return result;
};

/**
 * Subtracts whole years from a date. Expressed in months so Feb 29th clamps to
 * Feb 28th on a non-leap target year instead of rolling into March 1st.
 */
export const subtractYears = (date: Date, amount: number): Date =>
  subtractMonths(date, amount * 12);
