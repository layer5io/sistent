/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThemeProps } from '@rjsf/core';
import type { FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { generateTemplates } from './templates';
import { generateWidgets } from './widgets';

/**
 * Generates the complete Sistent RJSF theme object with all default templates and widgets.
 *
 * Note: This generates the RJSF template and widget registry. Components resolve Sistent's
 * palette and typography dynamically via `useTheme()`, so direct consumers using `withTheme(generateTheme())`
 * must ensure an ambient `SistentThemeProvider` is present in their component tree.
 */
export function generateTheme<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(): ThemeProps<T, S, F> {
  return {
    templates: generateTemplates<T, S, F>(),
    widgets: generateWidgets<T, S, F>()
  };
}

export default generateTheme();
