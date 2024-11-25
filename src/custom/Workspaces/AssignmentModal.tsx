/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, ModalBody, ModalButtonPrimary, ModalButtonSecondary, ModalFooter } from '../Modal';
import { TransferList } from '../TransferModal/TransferList';
import { ModalActionDiv } from './styles';

interface AssignmentModalProps {
  open: boolean;
  onClose: (e?: React.MouseEvent) => void;
  title: string;
  headerIcon: JSX.Element;
  name: string;
  assignableData: any[];
  handleAssignedData: (data: any) => void;
  originalAssignedData: any[];
  emptyStateIcon: JSX.Element;
  handleAssignablePage: () => void;
  handleAssignedPage: () => void;
  originalLeftCount: number;
  originalRightCount: number;
  onAssign: () => void;
  disableTransfer: boolean;
  isAssignAllowed: boolean;
  isRemoveAllowed: boolean;
  helpText: string;
}

const AssignmentModal: React.FC<AssignmentModalProps> = ({
  open,
  onClose,
  title,
  headerIcon,
  name,
  assignableData,
  handleAssignedData,
  originalAssignedData,
  emptyStateIcon,
  handleAssignablePage,
  handleAssignedPage,
  originalLeftCount,
  originalRightCount,
  onAssign,
  disableTransfer,
  isAssignAllowed,
  isRemoveAllowed,
  helpText
}) => {
  return (
    <Modal
      open={open}
      closeModal={onClose}
      title={title}
      headerIcon={headerIcon}
      maxWidth="md"
      reactNode={undefined}
    >
      <ModalBody>
        <TransferList
          name={name}
          assignableData={assignableData}
          assignedData={handleAssignedData}
          originalAssignedData={originalAssignedData}
          emptyStateIconLeft={emptyStateIcon}
          emtyStateMessageLeft={`No ${name.toLowerCase()} available`}
          emptyStateIconRight={emptyStateIcon}
          emtyStateMessageRight={`No ${name.toLowerCase()} assigned`}
          assignablePage={handleAssignablePage}
          assignedPage={handleAssignedPage}
          originalLeftCount={originalLeftCount}
          originalRightCount={originalRightCount}
          leftPermission={isAssignAllowed}
          rightPermission={isRemoveAllowed}
          transferComponentType={''}
        />
      </ModalBody>
      <ModalFooter variant="filled" helpText={helpText}>
        <ModalActionDiv>
          <ModalButtonSecondary onClick={onClose}>Cancel</ModalButtonSecondary>
          <ModalButtonPrimary onClick={onAssign} disabled={disableTransfer}>
            Save
          </ModalButtonPrimary>
        </ModalActionDiv>
      </ModalFooter>
    </Modal>
  );
};

export default AssignmentModal;
