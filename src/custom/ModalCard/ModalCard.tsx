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
}

function ModalCard({
  title,
  leftHeaderIcon,
  helpText,
  helpArea,
  actions,
  hideActions = false,
  content,
  closeComponent
}: CustomDialogProps): JSX.Element {
  return (
    <ModalWrapper>
      <HeaderModal>
        {leftHeaderIcon && (
          <div style={{ display: 'flex', alignItems: 'center' }}>{leftHeaderIcon}</div>
        )}
        {title && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <HeaderTypography>{title}</HeaderTypography>
            </div>
          </>
        )}

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {helpText && <>{helpArea}</>}
          {closeComponent}
        </div>
      </HeaderModal>
      <ContentContainer>{content}</ContentContainer>
      {!hideActions && <ButtonContainer>{actions}</ButtonContainer>}
    </ModalWrapper>
  );
}

export default ModalCard;
