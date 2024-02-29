import { Backdrop, type DialogProps } from '@mui/material';
import { Dialog } from '../../base/Dialog';
import { DialogTitle } from '../../base/DialogTitle';
import StyledDialogActions from './StyledDialogActions';
import StyledDialogContent from './StyledDialogContent';
import { ButtonContainer, ContentContainer, HeaderModal, ModalWrapper } from './style';

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
  maxWidth?: DialogProps['maxWidth'];
  onClose: () => void;
}

function CustomDialog({
  open,
  onClose,
  title,
  leftHeaderIcon,
  helpText,
  helpArea,
  actions,
  hideActions = false,
  content,
  maxWidth = 'xs',
  ...props
}: CustomDialogProps): JSX.Element {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '10px'
        }
      }}
      open={open}
      maxWidth={maxWidth}
      onClose={onClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500
        }
      }}
      {...props}
    >
      <ModalWrapper>
        <HeaderModal>
          {leftHeaderIcon && (
            <div style={{ display: 'flex', alignItems: 'center' }}>{leftHeaderIcon}</div>
          )}
          {title && (
            <>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <DialogTitle>{title}</DialogTitle>
              </div>
            </>
          )}

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {helpText && <div>{helpArea}</div>}
          </div>
        </HeaderModal>
        <StyledDialogContent>
          <ContentContainer>{content}</ContentContainer>
        </StyledDialogContent>
        {!hideActions && (
          <StyledDialogActions>
            <ButtonContainer>{actions}</ButtonContainer>
          </StyledDialogActions>
        )}
      </ModalWrapper>
    </Dialog>
  );
}

export default CustomDialog;
