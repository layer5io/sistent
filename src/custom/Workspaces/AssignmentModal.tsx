/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from '../../base';
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
  showViews?: boolean;
  nameViews?: string;
  assignableViewsData?: any[];
  handleAssignedViewsData?: (data: any) => void;
  originalAssignedViewsData?: any[];

  emptyStateViewsIcon?: JSX.Element;
  handleAssignableViewsPage?: () => void;
  handleAssignedViewsPage?: () => void;
  originalLeftViewsCount?: number;
  originalRightViewsCount?: number;
  onAssignViews?: () => void;
  disableTransferViews?: boolean;
  isAssignAllowedViews?: boolean;
  isRemoveAllowedViews?: boolean;
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
  helpText,
  showViews,
  nameViews,
  assignableViewsData,
  handleAssignedViewsData,
  originalAssignedViewsData,
  emptyStateViewsIcon,
  handleAssignableViewsPage,
  handleAssignedViewsPage,
  originalLeftViewsCount,
  originalRightViewsCount,
  isAssignAllowedViews = false,
  isRemoveAllowedViews = false
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
        <Divider
          style={{
            margin: 'auto',
            width: '80%',
            marginTop: '22px',
            marginBottom: '22px'
          }}
        />
        {showViews && (
          <TransferList
            name={nameViews}
            assignableData={assignableViewsData || []}
            assignedData={handleAssignedViewsData || (() => {})}
            originalAssignedData={originalAssignedViewsData || []}
            emptyStateIconLeft={emptyStateViewsIcon || <></>}
            emtyStateMessageLeft={`No views available`}
            emptyStateIconRight={emptyStateViewsIcon || <></>}
            emtyStateMessageRight={`No views assigned`}
            assignablePage={handleAssignableViewsPage || (() => {})}
            assignedPage={handleAssignedViewsPage || (() => {})}
            originalLeftCount={originalLeftViewsCount ?? 0}
            originalRightCount={originalRightViewsCount ?? 0}
            leftPermission={isAssignAllowedViews}
            rightPermission={isRemoveAllowedViews}
            transferComponentType={''}
          />
        )}
      </ModalBody>
      <ModalFooter variant="filled" helpText={helpText}>
        <ModalActionDiv>
          <ModalButtonSecondary onClick={onClose}>Cancel</ModalButtonSecondary>
          <ModalButtonPrimary onClick={onAssign} disabled={disableTransfer || disableTransferViews}>
            Save
          </ModalButtonPrimary>
        </ModalActionDiv>
      </ModalFooter>
    </Modal>
  );
};

export default AssignmentModal;
