import { type DialogProps } from '@mui/material';
import {
  ButtonContainer,
  ContentContainer,
  HeaderModal,
  HeaderTypography,
  ModalWrapper
} from './style';

export interface CustomDialogProps {
  open: boolean;
  fullScreen?: boolean;
  title?: string;
  leftHeaderIcon?: React.ReactNode;
  helpText?: string;
  helpArea?: React.ReactNode;
  actions?: React.ReactNode;
  hideActions?: boolean;
  styleContent?: React.CSSProperties;
  content: React.ReactNode;
  closeComponent: React.ReactNode;
  maxWidth?: DialogProps['maxWidth'];
  onClose: () => void;
  'data-testid'?: string;
}

function ModalCard({
  title,
  leftHeaderIcon,
  helpText,
  helpArea,
  actions,
  hideActions = false,
  content,
  closeComponent,
  'data-testid': testId = 'modal-card-wrapper'
}: CustomDialogProps): JSX.Element {
  return (
    <ModalWrapper data-testid={testId}>
      <HeaderModal data-testid="modal-card-header">
        {leftHeaderIcon && (
          <div
            style={{ display: 'flex', alignItems: 'center' }}
            data-testid="modal-card-header-icon"
          >
            {leftHeaderIcon}
          </div>
        )}
        {title && (
          <div
            style={{ display: 'flex', alignItems: 'center', color: 'white' }}
            data-testid="modal-card-title"
          >
            <HeaderTypography>{title}</HeaderTypography>
          </div>
        )}
        <div
          style={{ display: 'flex', alignItems: 'center' }}
          data-testid="modal-card-header-right"
        >
          {helpText && <div data-testid="modal-card-help-area">{helpArea}</div>}
          <div data-testid="modal-card-close-button">{closeComponent}</div>
        </div>
      </HeaderModal>

      <ContentContainer data-testid="modal-card-content">{content}</ContentContainer>

      {!hideActions && (
        <ButtonContainer data-testid="modal-card-actions">{actions}</ButtonContainer>
      )}
    </ModalWrapper>
  );
}

export default ModalCard;
