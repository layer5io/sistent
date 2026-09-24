/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThemeProps } from '@rjsf/core';
import type { RJSFSchema } from '@rjsf/utils';
import defaultTheme, { generateTheme } from './generateTheme';

/**
 * Default Sistent RJSF theme containing standard templates and widgets.
 *
 * Note: `sistentTheme` provides the RJSF component registry. Components resolve Sistent's
 * palette and typography dynamically via `useTheme()`, so direct consumers using `withTheme(sistentTheme)`
 * must ensure an ambient `SistentThemeProvider` is present in their component tree.
 */
export const sistentTheme: ThemeProps<any, RJSFSchema, any> = defaultTheme;

export default sistentTheme;
export { generateTheme };
