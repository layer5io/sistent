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
    'onSubmit' | 'formRef' | 'formData' | 'onChange'
  > {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (formData: any) => void;
  title: string;
  buttonTitle: string;
  helpText?: string;
  leftHeaderIcon?: React.ReactNode | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any;
  /**
   * Invoked when the user clicks the primary button but the form
   * fails validation (either `validateForm()` returned false or it
   * threw during schema compilation). Receives the RJSF error list.
   *
   * Consumers should surface the errors through their notification
   * system (toast, inline error banner, etc.). If omitted, validation
   * failures are silently logged to `console.warn` — preventing the
   * historical "Import button does nothing" dead-button bug.
   */
  onValidationError?: (errors: RJSFValidationError[]) => void;
}

/**
 * Sistent's standard modal wrapper around `RJSFFormWrapper`.
 *
 * Bundles:
 *   - sistent `Modal` + `ModalBody` + `ModalFooter` chrome
 *   - a `PrimaryActionButtons` submit/cancel pair
 *   - a `validateForm()` guard that surfaces validation errors via
 *     the `onValidationError` callback (so consumers do not have to
 *     reimplement the silent-dead-button-vs-toast logic per repo)
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

  const handleSubmit = (): void => {
    if (!formRef.current) {
      return;
    }
    let isValid: boolean;
    try {
      isValid = formRef.current.validateForm();
    } catch (err) {
      const message = (err as Error)?.message ?? String(err);
      const errors: RJSFValidationError[] = [
        { stack: `Form could not be validated: ${message}` }
      ];
      if (onValidationError) {
        onValidationError(errors);
      } else {
        console.warn('[RJSFFormModal] validateForm threw:', err);
      }
      return;
    }
    if (!isValid) {
      const errors: RJSFValidationError[] =
        formRef.current.state?.errors ?? [];
      if (onValidationError) {
        onValidationError(errors);
      } else {
        console.warn('[RJSFFormModal] validateForm returned false:', errors);
      }
      return;
    }
    onSubmit(formRef.current.state.formData);
    onClose();
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
            formRef={formRef}
          />
        </div>
      </ModalBody>
      <ModalFooter variant="filled" helpText={helpText}>
        <PrimaryActionButtons
          primaryText={buttonTitle}
          secondaryText="Cancel"
          primaryButtonProps={{ onClick: handleSubmit }}
          secondaryButtonProps={{ onClick: onClose }}
        />
      </ModalFooter>
    </Modal>
  );
}

RJSFFormModal.displayName = 'RJSFFormModal';
