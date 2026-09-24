/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type FormContextType,
  type RJSFSchema,
  type StrictRJSFSchema,
  type WidgetProps,
  getTemplate
} from '@rjsf/utils';
import React from 'react';

/**
 * Sistent's `TextareaWidget` renders multiline text fields.
 */
export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: WidgetProps<T, S, F>): React.JSX.Element {
  const { options, registry } = props;
  const BaseInputTemplate = getTemplate<'BaseInputTemplate', T, S, F>(
    'BaseInputTemplate',
    registry,
    options
  );

  let rows: string | number = 4;
  if (typeof options.rows === 'string' || typeof options.rows === 'number') {
    rows = options.rows;
  }

  return <BaseInputTemplate {...props} multiline rows={rows} />;
}
