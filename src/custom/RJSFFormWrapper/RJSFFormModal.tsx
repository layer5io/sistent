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

export interface RJSFFormModalProps
  extends Omit<
    RJSFFormWrapperProps,
    'onSubmit' | 'onError' | 'formRef' | 'formData' | 'onChange' | 'children'
  > {
  open: boolean;
  onClose: () => void;
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
  ...rest
}: RJSFFormModalProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>(initialData ?? {});

  useEffect(() => {
    if (!open) {
      setFormData({});
      return;
    }
    setFormData(initialData ?? {});
  }, [open, initialData]);

  const handlePrimaryClick = (): void => {
    if (!formRef.current) {
      return;
    }
    // Delegate to RJSF's submit lifecycle — this triggers internal
    // validation and fan-out to `onSubmit` / `onError` props on the
    // form, which we pass through below.
    try {
      formRef.current.submit();
    } catch (err) {
      const message = (err as Error)?.message ?? String(err);
      const errors: RJSFValidationError[] = [
        { stack: `Form could not be validated: ${message}` }
      ];
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
          <RJSFFormWrapper
            {...rest}
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
