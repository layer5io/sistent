import { subtractDays, subtractMonths, subtractYears } from '../utils/date.utils';

// These replaced `date-fns` (an optional peer dependency that the package
// barrel was importing eagerly). The end-of-month clamping is the part that is
// easy to get wrong and silently ships a filter range off by three days.

describe('subtractDays', () => {
  it('walks back across a month boundary', () => {
    expect(subtractDays(new Date(2025, 2, 5), 7)).toEqual(new Date(2025, 1, 26));
  });

  it('walks back across a year boundary', () => {
    expect(subtractDays(new Date(2025, 0, 3), 7)).toEqual(new Date(2024, 11, 27));
  });

  it('preserves the time of day', () => {
    expect(subtractDays(new Date(2025, 5, 15, 13, 45, 30, 250), 30)).toEqual(
      new Date(2025, 4, 16, 13, 45, 30, 250)
    );
  });

  it('does not mutate its argument', () => {
    const original = new Date(2025, 5, 15);
    subtractDays(original, 30);
    expect(original).toEqual(new Date(2025, 5, 15));
  });
});

describe('subtractMonths', () => {
  it('subtracts whole months when the day exists in the target month', () => {
    expect(subtractMonths(new Date(2025, 7, 15), 3)).toEqual(new Date(2025, 4, 15));
  });

  it('clamps to the last day of a shorter target month instead of rolling over', () => {
    // The naive `setMonth(getMonth() - 3)` on May 31st yields March 3rd, which
    // would silently widen a "last 3 months" range by three days.
    expect(subtractMonths(new Date(2025, 4, 31), 3)).toEqual(new Date(2025, 1, 28));
    expect(subtractMonths(new Date(2025, 9, 31), 1)).toEqual(new Date(2025, 8, 30));
  });

  it('clamps into a leap February', () => {
    expect(subtractMonths(new Date(2024, 2, 31), 1)).toEqual(new Date(2024, 1, 29));
  });

  it('crosses a year boundary', () => {
    expect(subtractMonths(new Date(2025, 1, 10), 6)).toEqual(new Date(2024, 7, 10));
  });

  it('preserves the time of day while clamping', () => {
    expect(subtractMonths(new Date(2025, 4, 31, 9, 30), 3)).toEqual(new Date(2025, 1, 28, 9, 30));
  });

  it('does not mutate its argument', () => {
    const original = new Date(2025, 4, 31);
    subtractMonths(original, 3);
    expect(original).toEqual(new Date(2025, 4, 31));
  });
});

describe('subtractYears', () => {
  it('subtracts whole years', () => {
    expect(subtractYears(new Date(2025, 6, 4), 1)).toEqual(new Date(2024, 6, 4));
  });

  it('clamps Feb 29th to Feb 28th on a non-leap target year', () => {
    expect(subtractYears(new Date(2024, 1, 29), 1)).toEqual(new Date(2023, 1, 28));
  });

  it('keeps Feb 29th when the target year is also a leap year', () => {
    expect(subtractYears(new Date(2024, 1, 29), 4)).toEqual(new Date(2020, 1, 29));
  });
});
