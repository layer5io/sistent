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
 * Sistent's `TextWidget` delegates text input rendering to `BaseInputTemplate`.
 */
export default function TextWidget<
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
  return <BaseInputTemplate {...props} />;
}
