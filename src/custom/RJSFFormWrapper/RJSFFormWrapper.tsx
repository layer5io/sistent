import { withTheme, type FormProps } from '@rjsf/core';
import { Theme as MaterialUITheme } from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import React, { type Ref } from 'react';
import { SistentThemeProvider } from '../../theme';

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
}

/**
 * Sistent's standard RJSF form wrapper. Pre-configures the validator
 * and theme so consumers (Meshery Cloud, Meshery, Meshery Extensions)
 * stop maintaining parallel RJSF setups.
 *
 * Pairs with `RJSFFormModal` for the common modal-form pattern, or
 * can be embedded directly when the consumer owns the surrounding
 * chrome.
 */
export function RJSFFormWrapper({
  formRef,
  children,
  ...rest
}: RJSFFormWrapperProps): JSX.Element {
  return (
    <SistentThemeProvider>
      <MuiRJSFForm
        validator={validator}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={formRef as any}
        {...rest}
      >
        {/*
          @rjsf/core renders an in-form submit button when `children`
          is empty. Consumers that own the submit affordance (e.g.
          `RJSFFormModal`'s footer button) pass an empty fragment so
          RJSF suppresses its own button.
        */}
        {children ?? <></>}
      </MuiRJSFForm>
    </SistentThemeProvider>
  );
}

RJSFFormWrapper.displayName = 'RJSFFormWrapper';
