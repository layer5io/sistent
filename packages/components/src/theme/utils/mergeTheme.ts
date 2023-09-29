import R from 'ramda';
import { SistentSizes } from '../types/SistentSizes';
import { SistentTheme, SistentThemeBase, SistentThemeOverride } from '../types/SistentTheme';
import { attachFns } from './attachFunctions';
import { getBreakpointValue } from './getBreakpointValue';

export function mergeTheme(
  currentTheme: SistentThemeBase,
  themeOverride?: SistentThemeOverride
): SistentThemeBase {
  if (!themeOverride) {
    return currentTheme;
  }

  const result = R.mergeDeepRight(currentTheme, themeOverride);

  if (themeOverride?.headings?.sizes) {
    result.headings = {
      ...result.headings,
      sizes: R.mergeDeepRight(currentTheme.headings.sizes, themeOverride.headings.sizes)
    };
  }

  if (themeOverride.breakpoints) {
    result.breakpoints = R.pipe(
      R.toPairs,
      R.sortBy(([key, value]) => getBreakpointValue(value as string)),
      R.fromPairs
    )(R.mergeRight(currentTheme.breakpoints, themeOverride.breakpoints)) as SistentSizes;
  }

  if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }

  if (!(result.primaryColor in result.colors)) {
    throw new Error(
      'SistentProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color'
    );
  }

  return result as SistentThemeBase;

  /*
    const result: SistentThemeBase = Object.keys(currentTheme).reduce((acc, key) => {
        if (key === 'headings' && themeOverride.headings) {
            const sizes = themeOverride.headings.sizes
                ? Object.keys(currentTheme.headings.sizes).reduce((headingsAcc, h) => {
                    headingsAcc[h] = {
                        ...currentTheme.headings.sizes[h],
                        ...themeOverride.headings.sizes[h],
                    };
                    return headingsAcc;
                }, {} as SistentThemeBase['headings']['sizes'])
                : currentTheme.headings.sizes;
            return {
                ...acc,
                headings: {
                    ...currentTheme.headings,
                    ...themeOverride.headings,
                    sizes,
                },
            };
        }

        if (key === 'breakpoints' && themeOverride.breakpoints) {
            const mergedBreakpoints = { ...currentTheme.breakpoints, ...themeOverride.breakpoints };

            return {
                ...acc,
                breakpoints: Object.fromEntries(
                    Object.entries(mergedBreakpoints).sort(
                        (a, b) => getBreakpointValue(a[1]) - getBreakpointValue(b[1])
                    )
                ),
            };
        }

        acc[key] =
            typeof themeOverride[key] === 'object'
                ? { ...currentTheme[key], ...themeOverride[key] }
                : typeof themeOverride[key] === 'number' ||
                    typeof themeOverride[key] === 'boolean' ||
                    typeof themeOverride[key] === 'function'
                    ? themeOverride[key]
                    : themeOverride[key] || currentTheme[key];
        return acc;
    }, {} as SistentThemeBase);

    if (themeOverride?.fontFamily && !themeOverride?.headings?.fontFamily) {
        result.headings.fontFamily = themeOverride.fontFamily as string;
    }

    if (!(result.primaryColor in result.colors)) {
        throw new Error(
            'SistentProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color'
        );
    }

    return result;
    */
}

export function mergeThemeWithFn(
  currentTheme: SistentThemeBase,
  themeOverride?: SistentThemeOverride
): SistentTheme {
  return attachFns(mergeTheme(currentTheme, themeOverride));
}
