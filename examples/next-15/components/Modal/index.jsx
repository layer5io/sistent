import { Button, Dialog, DialogContent, DialogTitle, Tooltip } from '@layer5/sistent-components';
import { CloseIcon } from '@layer5/sistent-svg';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { styled } from '@mui/material/styles';
import React from 'react';

const StyledDialogActionsFooter = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '0.9375rem 1.25rem',
  alignItems: 'center',
  justifyContent: 'flex-end',
  boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#294957',
  opacity: '0.8'
}));

const StyledDialogActions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  padding: '0.9375rem 1.25rem',
  alignItems: 'center',
  boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)',
  backgroundColor: '#294957',
  color: 'white'
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.mode === 'dark' ? '#303030' : 'white',
    borderRadius: '10px',
    zIndex: 9999
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#294957',
  textAlign: 'center',
  color: 'white',
  bottom: '2px',
  boxShadow: '0px 4px 4px rgba(0, 179, 159, 0.4)'
}));

const CloseIconButton = styled(CloseIcon)(({ theme }) => ({
  transform: 'rotate(-90deg)',
  '&:hover': {
    transform: 'rotate(90deg)',
    transition: 'all .3s ease-in',
    cursor: 'pointer'
  },
  table: {
    minWidth: '62.625rem'
  },
  height: '2rem',
  width: '2rem'
}));

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#00B39F',
  width: '100%',
  '&:hover': {
    backgroundColor: '#00D3A9'
  }
}));

const CancelButton = styled(Button)(() => ({
  marginRight: '1rem',
  color: '#000',
  backgroundColor: 'white',
  width: '100%',
  '&:hover': {
    backgroundColor: 'white'
  }
}));

const HeaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const IconsContainer = styled('div')({
  display: 'flex',
  alignItems: 'center'
});

const FullscreenButton = styled(FullscreenIcon)(({ theme }) => ({
  height: '2.25rem',
  width: '2.25rem',
  fill: theme.palette.background.paper,
  cursor: 'pointer'
}));

const FullscreenExitButton = styled(FullscreenExitIcon)(({ theme }) => ({
  height: '2.25rem',
  width: '2.25rem',
  fill: theme.palette.background.paper,
  cursor: 'pointer'
}));

function Modal(props) {
  const {
    open,
    handleClose,
    modalTitle,
    maxWidth,
    cancelButton = true,
    cancelButtonText,
    actionButtonText,
    onAction,
    onCancel,
    footerText,
    modalIcon,
    isFullScreenModeAllowed,
    contentStyles,
    children,
    style
  } = props;

  const [fullScreen, setFullScreen] = React.useState(false);

  const toggleFullScreen = () => {
    setFullScreen((state) => !state);
  };

  return (
    <React.Fragment>
      <StyledDialog
        open={open}
        onClose={handleClose}
        maxWidth={maxWidth ? maxWidth : 'md'}
        fullScreen={fullScreen}
        fullWidth={!fullScreen}
        sx={{
          '& .MuiDialog-paper': {
            ...style
          }
        }}
      >
        {/* Modal Header */}
        <StyledDialogTitle>
          <HeaderWrapper>
            {modalIcon}
            {modalTitle}
            <IconsContainer>
              {isFullScreenModeAllowed && (
                <Tooltip title={fullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                  {fullScreen ? (
                    <FullscreenExitButton onClick={toggleFullScreen} />
                  ) : (
                    <FullscreenButton onClick={toggleFullScreen} />
                  )}
                </Tooltip>
              )}
              <Tooltip title="close">
                <CloseIconButton onClick={handleClose} />
              </Tooltip>
            </IconsContainer>
          </HeaderWrapper>
        </StyledDialogTitle>
        {/* Modal Content */}
        <DialogContent sx={{ ...contentStyles }}>{children}</DialogContent>

        {/* Modal Actions */}
        {onAction ? (
          <StyledDialogActionsFooter>
            {cancelButton && (
              <CancelButton variant="contained" onClick={onCancel}>
                {cancelButtonText ? cancelButtonText : 'Cancel'}
              </CancelButton>
            )}
            <ActionButton variant="contained" onClick={onAction}>
              {actionButtonText ? actionButtonText : 'Save'}
            </ActionButton>
          </StyledDialogActionsFooter>
        ) : (
          <StyledDialogActions>{footerText}</StyledDialogActions>
        )}
      </StyledDialog>
    </React.Fragment>
  );
}

export default Modal;
