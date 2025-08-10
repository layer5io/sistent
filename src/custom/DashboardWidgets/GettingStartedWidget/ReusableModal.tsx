import { ReactNode } from 'react';
import { Button } from '../../../base';
import { styled } from '../../../theme';
import {
  Modal,
  ModalBody,
  ModalButtonPrimary,
  ModalButtonSecondary,
  ModalFooter
} from '../../Modal';

const CancelButton = styled(Button)(({ theme }) => ({
  borderColor: `${theme.palette.grey[300]} !important`,
  color: `${theme.palette.grey[300]} !important`,
  width: 'fit-content !important'
}));

const ActionButtons = styled('div')(() => ({
  display: 'flex',
  flex: 'auto',
  justifyContent: 'flex-end',
  gap: '1rem'
}));

interface ReusableModalProps {
  children: ReactNode;
  open: boolean;
  isFullScreenModeAllowed?: boolean;
  handleClose: () => void;
  modalIcon?: ReactNode;
  modalTitle?: string;
  onAction?: () => void;
  onSecondaryAction?: () => void;
  actionName?: string;
  secondaryActionName?: string;
  cancelButton?: boolean;
  cancelButtonText?: string;
  onCancel?: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  actionButton?: boolean;
  secondaryActionButton?: boolean;
}

const ReusableModal = ({
  children,
  open,
  handleClose,
  modalIcon,
  modalTitle,
  onAction,
  onSecondaryAction,
  actionName,
  secondaryActionName,
  cancelButton = true,
  cancelButtonText,
  onCancel,
  maxWidth,
  actionButton = true,
  secondaryActionButton = false
}: ReusableModalProps): JSX.Element => {
  return (
    <Modal
      closeModal={handleClose}
      useBrandColors={true}
      title={modalTitle || ''}
      open={open}
      headerIcon={modalIcon}
      maxWidth={maxWidth ? maxWidth : 'md'}
    >
      <ModalBody>{children}</ModalBody>
      <ModalFooter variant="filled" useBrandColors={true}>
        <>
          {cancelButton && (
            <CancelButton variant="outlined" onClick={onCancel}>
              {cancelButtonText ? cancelButtonText : 'Cancel'}
            </CancelButton>
          )}
          <ActionButtons>
            {secondaryActionButton && (
              <ModalButtonSecondary variant="contained" onClick={onSecondaryAction}>
                {secondaryActionName ? secondaryActionName : 'Save'}
              </ModalButtonSecondary>
            )}
            {actionButton && (
              <ModalButtonPrimary variant="contained" onClick={onAction}>
                {actionName ? actionName : 'Save'}
              </ModalButtonPrimary>
            )}
          </ActionButtons>
        </>
      </ModalFooter>
    </Modal>
  );
};

export default ReusableModal;
