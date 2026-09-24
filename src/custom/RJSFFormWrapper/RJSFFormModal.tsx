import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalBody, ModalFooter, PrimaryActionButtons } from '../Modal';
import { RJSFFormWrapper, type RJSFFormWrapperProps } from './RJSFFormWrapper';

/**
 * Shape of a single RJSF / Ajv validation error. Matches the
 * `@rjsf/utils` `RJSFValidationError` interface but is duplicated
 * here as a structural type so sistent does not need to take a
 * direct dep on `@rjsf/utils`.
 */
export interface RJSFValidationError {
  name?: string;
  message?: string;
  property?: string;
  schemaPath?: string;
  stack?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}

export interface RJSFFormModalProps extends Omit<
  RJSFFormWrapperProps,
  'onSubmit' | 'onError' | 'formRef' | 'formData' | 'onChange' | 'children'
> {
  open: boolean;
  onClose: () => void;
  /**
   * Suppress the form's ROOT object title and description so its child
   * fields render directly inside the modal body.
   *
   * Defaults to `true`: the modal header (`title` prop) already names
   * the form, so the canonical schema's root object title would
   * otherwise be drawn a second time — as a duplicate heading in the
   * default theme, or as a collapsed accordion in the custom RJSF
   * templates used downstream. Set to `false` only if you genuinely
   * want the root object's own title rendered inside the body.
   *
   * Implemented through the UI schema (`ui:options.label = false`), so
   * the canonical `@meshery/schemas` JSON schema is consumed unmodified.
   */
  hideRootTitle?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (formData: any) => void;
  title: string;
  buttonTitle: string;
  /**
   * Label for the secondary (cancel) button. Defaults to `'Cancel'`.
   * Exposed for i18n.
   */
  cancelButtonTitle?: string;
  helpText?: string;
  leftHeaderIcon?: React.ReactNode | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  /**
   * Invoked when the user clicks the primary button but the form
   * fails validation. Receives the RJSF error list (whatever
   * `@rjsf/core`'s `onError` would emit). Consumers should surface
   * the errors through their notification system (toast, inline
   * error banner, etc.).
   *
   * If omitted, validation failures are logged to `console.warn` —
   * preventing the historical "Import button does nothing"
   * dead-button bug while still defaulting to non-noisy behavior
   * when the consumer hasn't wired up notifications yet.
   */
  onValidationError?: (errors: RJSFValidationError[]) => void;
}

/**
 * Sistent's standard modal wrapper around `RJSFFormWrapper`.
 *
 * Bundles:
 *   - sistent `Modal` + `ModalBody` + `ModalFooter` chrome
 *   - a `PrimaryActionButtons` submit/cancel pair
 *   - canonical RJSF lifecycle wiring: the primary button calls
 *     `form.submit()`, which triggers Ajv validation inside RJSF and
 *     fires either `onSubmit` (on success) or `onError` (on validation
 *     failure). This avoids reading `formRef.state.errors` directly,
 *     which is unreliable because RJSF's internal `setState` is async
 *     and the ref may still expose pre-validation errors immediately
 *     after `validateForm()`.
 *
 * The form's RJSF props (`schema`, `uiSchema`, `widgets`, etc.) are
 * forwarded directly to `RJSFFormWrapper`.
 */
export function RJSFFormModal({
  open,
  onClose,
  onSubmit,
  title,
  buttonTitle,
  cancelButtonTitle = 'Cancel',
  helpText,
  leftHeaderIcon = null,
  initialData,
  onValidationError,
  hideRootTitle = true,
  ...rest
}: RJSFFormModalProps): React.JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(initialData ?? {});
  const prevOpenRef = useRef(open);

  useEffect(() => {
    // Synchronize formData only when modal transitions between open and closed.
    // Re-rendering the parent with a new initialData object reference while the modal
    // remains open must not overwrite user-entered form data.
    if (!prevOpenRef.current && open) {
      setFormData(initialData ?? {});
    } else if (prevOpenRef.current && !open) {
      setFormData({});
    }
    prevOpenRef.current = open;
  }, [open, initialData]);

  const handlePrimaryClick = (): void => {
    if (!formRef.current) {
      return;
    }
    // Dispatch a bubbling submit event on formElement.current (with fallback to formRef.current.submit()).
    // This directly invokes RJSF's onSubmit handler to execute schema validation, omitExtraData, and
    // onError / onSubmit routing, rather than relying solely on browser-native requestSubmit() which
    // can halt submission before RJSF runs if HTML5 constraint validation fails on empty required fields.
    try {
      if (formRef.current.formElement?.current) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        formRef.current.formElement.current.dispatchEvent(submitEvent);
        return;
      }
      if (typeof formRef.current.submit === 'function') {
        formRef.current.submit();
      }
    } catch (err) {
      const message = (err as Error)?.message ?? String(err);
      const errors: RJSFValidationError[] = [{ stack: `Form could not be validated: ${message}` }];
      if (onValidationError) {
        onValidationError(errors);
      } else {
        console.warn('[RJSFFormModal] submit threw:', err);
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = (e: any): void => {
    onSubmit(e.formData);
    onClose();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormError = (errors: any[]): void => {
    if (onValidationError) {
      onValidationError(errors as RJSFValidationError[]);
    } else {
      console.warn('[RJSFFormModal] form validation failed:', errors);
    }
  };

  return (
    <Modal open={open} closeModal={onClose} title={title} headerIcon={leftHeaderIcon}>
      <ModalBody>
        <div style={{ width: '100%' }}>
          {/*
            Adjacent modal UX fix: Remount RJSFFormWrapper when `open` toggles
            so that internal RJSF validation errors (Form.state.errors) and uncommitted
            transient input state from a canceled session do not persist when the modal
            is reopened with fresh initialData.
          */}
          <RJSFFormWrapper
            key={open ? 'open' : 'closed'}
            {...rest}
            hideRootTitle={hideRootTitle}
            formData={formData}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e: any) => setFormData(e.formData)}
            onSubmit={handleFormSubmit}
            onError={handleFormError}
            formRef={formRef}
          >
            {/*
              Suppress RJSF's default in-form submit button — the
              modal's PrimaryActionButtons owns the submit affordance.
            */}
            <></>
          </RJSFFormWrapper>
        </div>
      </ModalBody>
      <ModalFooter variant="filled" helpText={helpText}>
        <PrimaryActionButtons
          primaryText={buttonTitle}
          secondaryText={cancelButtonTitle}
          primaryButtonProps={{ onClick: handlePrimaryClick }}
          secondaryButtonProps={{ onClick: onClose }}
        />
      </ModalFooter>
    </Modal>
  );
}

RJSFFormModal.displayName = 'RJSFFormModal';
