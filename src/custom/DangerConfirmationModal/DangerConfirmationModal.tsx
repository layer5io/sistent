import { DialogProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '../../base';
import { iconLarge, iconMedium } from '../../constants/iconsSizes';
import { IdeaIcon, WarningIcon } from '../../icons';
import { useTheme } from '../../theme';
import { Modal, ModalBody, ModalButtonDanger, ModalButtonSecondary, ModalFooter } from '../Modal';
import {
  Actions,
  CheckboxSection,
  ConfirmField,
  ConfirmFieldLabel,
  DangerBody,
  RecommendedCallout,
  RecommendedCalloutBody
} from './style';

/** A single acknowledgement checkbox rendered inside the confirmation modal. */
export interface DangerConfirmationCheckbox {
  /** Stable identifier used as the React key and to build the checkbox `data-testid`. */
  id: string;
  /** Checkbox label. `ReactNode` so callers can embed counts, bold text, or links. */
  label: React.ReactNode;
  /**
   * When `true` (the default) this checkbox must be ticked before the primary
   * action enables. Set to `false` for a purely optional, non-gating checkbox.
   */
  required?: boolean;
  /** Initial checked state applied each time the modal opens. Defaults to `false`. */
  defaultChecked?: boolean;
}

export interface DangerConfirmationModalProps {
  /** Controls visibility. Fully controlled by the caller. */
  open: boolean;
  /** Fired when the user dismisses the modal (Cancel button, close icon, backdrop, or Escape). */
  onCancel: () => void;
  /** Fired when the user confirms and every gate (typed phrase + required checkboxes) is satisfied. */
  onConfirm: () => void;
  /** Modal title, e.g. `"Delete organization"`. */
  title: string;
  /** Warning/description body. `ReactNode` so callers can bold the target name. Rendered with danger styling. */
  description: React.ReactNode;
  /**
   * Exact phrase the user must type to unlock the primary action (e.g. an
   * organization name). Comparison is strict and case-sensitive. Omit to
   * disable the type-to-confirm gate entirely.
   */
  confirmationPhrase?: string;
  /**
   * Label rendered above the type-to-confirm field. Defaults to
   * `Type <b>{confirmationPhrase}</b> to confirm`.
   */
  confirmationPhraseLabel?: React.ReactNode;
  /** Placeholder for the type-to-confirm field. Defaults to `confirmationPhrase`. */
  confirmationPhrasePlaceholder?: string;
  /**
   * One or more acknowledgement checkboxes. Every checkbox with
   * `required !== false` must be checked before the primary action enables.
   */
  checkboxes?: DangerConfirmationCheckbox[];
  /**
   * Optional callout recommending a safer alternative (e.g. transferring
   * ownership instead of deleting). Rendered in a highlighted info box above
   * the actions.
   */
  recommendedAlternative?: React.ReactNode;
  /** Primary (destructive) button label. Defaults to `"Delete"`. */
  confirmText?: string;
  /** Cancel button label. Defaults to `"Cancel"`. */
  cancelText?: string;
  /**
   * While `true`, the primary action is disabled and dismissal is blocked, so
   * an in-flight destructive request cannot be double-submitted or interrupted.
   * Defaults to `false`.
   */
  isConfirming?: boolean;
  /** Overrides the default warning header icon. */
  headerIcon?: React.ReactNode;
  /** Dialog max width. Defaults to `"sm"`. */
  maxWidth?: DialogProps['maxWidth'];
}

const buildInitialCheckedState = (
  checkboxes: DangerConfirmationCheckbox[]
): Record<string, boolean> =>
  checkboxes.reduce<Record<string, boolean>>((acc, checkbox) => {
    acc[checkbox.id] = checkbox.defaultChecked ?? false;
    return acc;
  }, {});

/**
 * A fully controlled, composable confirmation modal for destructive actions
 * (delete account, delete organization, etc.). Built from Sistent's existing
 * Modal primitives.
 *
 * The primary action stays disabled until every configured gate is satisfied:
 * the `confirmationPhrase` (if supplied) is typed exactly, and every required
 * checkbox is ticked. All gate state is managed internally; callers only wire
 * up `open`, `onCancel`, and `onConfirm`.
 */
export const DangerConfirmationModal: React.FC<DangerConfirmationModalProps> = ({
  open,
  onCancel,
  onConfirm,
  title,
  description,
  confirmationPhrase,
  confirmationPhraseLabel,
  confirmationPhrasePlaceholder,
  checkboxes,
  recommendedAlternative,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isConfirming = false,
  headerIcon,
  maxWidth = 'sm'
}) => {
  const theme = useTheme();
  const checkboxList = checkboxes ?? [];

  const [typedValue, setTypedValue] = useState('');
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>(() =>
    buildInitialCheckedState(checkboxList)
  );

  // Reset the ephemeral gate state each time the modal opens so a reused
  // instance never leaks a previous attempt's typed value or ticks. Keyed on
  // `open` alone: re-seeding on every `checkboxes` identity change would wipe
  // the user's in-progress selections whenever the parent re-renders.
  useEffect(() => {
    if (open) {
      setTypedValue('');
      setCheckedState(buildInitialCheckedState(checkboxes ?? []));
    }
  }, [open]);

  const typedGateSatisfied = !confirmationPhrase || typedValue === confirmationPhrase;
  const checkboxGateSatisfied = checkboxList.every(
    (checkbox) => checkbox.required === false || Boolean(checkedState[checkbox.id])
  );
  const canConfirm = typedGateSatisfied && checkboxGateSatisfied && !isConfirming;

  const handleClose = () => {
    // Block dismissal while a destructive request is in flight.
    if (isConfirming) return;
    onCancel();
  };

  const handleConfirm = () => {
    if (!canConfirm) return;
    onConfirm();
  };

  const handleCheckboxToggle = (id: string) => {
    setCheckedState((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resolvedHeaderIcon = headerIcon ?? (
    <WarningIcon {...iconLarge} fill={theme.palette.text.constant?.white ?? '#fff'} />
  );

  const resolvedConfirmationLabel: React.ReactNode = confirmationPhraseLabel ?? (
    <>
      Type <b>{confirmationPhrase}</b> to confirm
    </>
  );

  return (
    <Modal
      open={open}
      closeModal={handleClose}
      title={title}
      headerIcon={resolvedHeaderIcon}
      maxWidth={maxWidth}
      data-testid="danger-confirmation-modal"
    >
      <ModalBody data-testid="danger-confirmation-body">
        <DangerBody data-testid="danger-confirmation-description">
          <Typography component="div" variant="body1" color={theme.palette.text.primary}>
            {description}
          </Typography>
        </DangerBody>

        {recommendedAlternative && (
          <RecommendedCallout data-testid="danger-confirmation-recommended-alternative">
            <IdeaIcon {...iconMedium} fill={theme.palette.status.info} />
            <RecommendedCalloutBody>{recommendedAlternative}</RecommendedCalloutBody>
          </RecommendedCallout>
        )}

        {confirmationPhrase !== undefined && (
          <ConfirmField>
            <ConfirmFieldLabel htmlFor="danger-confirmation-input">
              {resolvedConfirmationLabel}
            </ConfirmFieldLabel>
            <TextField
              id="danger-confirmation-input"
              fullWidth
              size="small"
              value={typedValue}
              placeholder={confirmationPhrasePlaceholder ?? confirmationPhrase}
              onChange={(event) => setTypedValue(event.target.value)}
              autoComplete="off"
            />
          </ConfirmField>
        )}

        {checkboxList.length > 0 && (
          <CheckboxSection>
            <FormGroup data-testid="danger-confirmation-checkboxes">
              {checkboxList.map((checkbox) => (
                <FormControlLabel
                  key={checkbox.id}
                  control={
                    <Checkbox
                      checked={Boolean(checkedState[checkbox.id])}
                      onChange={() => handleCheckboxToggle(checkbox.id)}
                      color="primary"
                      data-testid={`danger-confirmation-checkbox-${checkbox.id}`}
                    />
                  }
                  label={checkbox.label}
                />
              ))}
            </FormGroup>
          </CheckboxSection>
        )}
      </ModalBody>

      <ModalFooter variant="filled">
        <Actions>
          <ModalButtonSecondary
            onClick={handleClose}
            disabled={isConfirming}
            data-testid="danger-confirmation-cancel"
          >
            {cancelText}
          </ModalButtonSecondary>
          <ModalButtonDanger
            onClick={handleConfirm}
            disabled={!canConfirm}
            data-testid="danger-confirmation-confirm"
          >
            {confirmText}
          </ModalButtonDanger>
        </Actions>
      </ModalFooter>
    </Modal>
  );
};

export default DangerConfirmationModal;
