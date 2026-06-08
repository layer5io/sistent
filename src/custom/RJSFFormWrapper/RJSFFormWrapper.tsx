import { withTheme, type FormProps } from '@rjsf/core';
import { Theme as MaterialUITheme } from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import React, { type Ref } from 'react';
import { SistentThemeProvider } from '../../theme';
import { hideRootObjectTitle } from './hideRootObjectTitle';

const MuiRJSFForm = withTheme(MaterialUITheme);

/**
 * Props accepted by `RJSFFormWrapper`. Inherits the full
 * `@rjsf/core` `FormProps` surface (schema, uiSchema, formData,
 * onChange, onSubmit, liveValidate, widgets, templates, fields, …)
 * minus `validator` — the wrapper pins the validator to the canonical
 * `@rjsf/validator-ajv8` default, which is preconfigured for the
 * RJSF form schemas published from `@meshery/schemas`.
 *
 * The `formRef` prop is a convenience alias for the form instance
 * ref — consumers use it to call `validateForm()` and read the
 * post-validation `state.errors` / `state.formData`.
 */
export interface RJSFFormWrapperProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extends Omit<FormProps<any, any, any>, 'validator' | 'children'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formRef?: Ref<any>;
  children?: React.ReactNode;
  /**
   * Suppress the form's ROOT object title and description so its child
   * fields render directly, without the duplicative object "header".
   *
   * This is the standard pattern for rendering the contents of a
   * schema's top-level object inside a surface that already names it
   * (most commonly a modal — see `RJSFFormModal`, which defaults this
   * to `true`). It is implemented purely through the UI schema
   * (`ui:options.label = false`), so the canonical `@meshery/schemas`
   * JSON schema is consumed unmodified. See `hideRootObjectTitle`.
   *
   * Defaults to `false` here to preserve the behavior of the
   * general-purpose wrapper when it is embedded with its own chrome.
   */
  hideRootTitle?: boolean;
}

/**
 * Sistent's standard RJSF form wrapper. Pre-configures the validator
 * and theme so consumers (Meshery Cloud, Meshery, Meshery Extensions)
 * stop maintaining parallel RJSF setups.
 *
 * Pairs with `RJSFFormModal` for the common modal-form pattern, or
 * can be embedded directly when the consumer owns the surrounding
 * chrome.
 *
 * `children` is passed through unchanged — when omitted, RJSF renders
 * its own default in-form submit button. Consumers (or
 * `RJSFFormModal`) that own the submit affordance should explicitly
 * pass an empty fragment to suppress it.
 */
export function RJSFFormWrapper({
  formRef,
  children,
  hideRootTitle = false,
  uiSchema,
  ...rest
}: RJSFFormWrapperProps): JSX.Element {
  const resolvedUiSchema = hideRootTitle ? hideRootObjectTitle(uiSchema) : uiSchema;
  return (
    <SistentThemeProvider>
      <MuiRJSFForm
        validator={validator}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={formRef as any}
        uiSchema={resolvedUiSchema}
        {...rest}
      >
        {children}
      </MuiRJSFForm>
    </SistentThemeProvider>
  );
}

RJSFFormWrapper.displayName = 'RJSFFormWrapper';
