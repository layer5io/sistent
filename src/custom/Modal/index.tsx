import { Dialog, DialogProps, IconButton, Typography, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Button, Paper } from '../../base';
import { iconLarge } from '../../constants/iconsSizes';
import { CloseIcon, InfoIcon } from '../../icons';

interface ModalProps extends DialogProps {
  closeModal: () => void;
  title: string;
  headerIcon: React.ReactNode;
  reactNode: React.ReactNode;
}

export const useModal = ({ headerIcon }: { headerIcon: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>('');

  const onCloseRef = useRef<(() => void) | null>(null);

  const [reactNode, setReactNode] = useState<React.ReactNode | null>(null);

  const openModal = ({
    title,
    reactNode = null,
    onClose
  }: {
    title: string;
    reactNode?: React.ReactNode;
    onClose?: () => void;
  }) => {
    title && setTitle(title);
    onClose && (onCloseRef.current = onClose);
    setOpen(true);
    reactNode && setReactNode(reactNode);
  };

  const closeModal = () => {
    setOpen(false);
    onCloseRef.current && onCloseRef.current();
    setReactNode(null);
    setTitle('');
    onCloseRef.current = null;
  };

  const ModalComponent = () => (
    <Modal
      open={open}
      closeModal={closeModal}
      title={title}
      reactNode={reactNode}
      headerIcon={headerIcon}
    />
  );

  return [
    ModalComponent,
    {
      isOpen: open,
      openModal,
      closeModal
    }
  ] as const;
};

const CloseBtn = styled(IconButton)`
  && {
    transform: rotate(-90deg);

    &:hover {
      transform: rotate(90deg);
      transition: all 0.3s ease-in;
      cursor: pointer;
    }
  }
`;

const StyledDialog = styled(Dialog)`
  && {
    .MuiDialog-paper {
      width: auto;
      max-width: 100%;
    }
  }
`;

const StyledHeader = styled('div')(() => ({
  background: 'linear-gradient(90deg, #3B687B 0%, #507D90 100%)',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  textAlign: 'center'
}));

export const Modal: React.FC<ModalProps> = ({
  open,
  closeModal,
  title,
  headerIcon,
  reactNode,
  children,
  ...props
}) => {
  return (
    <StyledDialog
      open={open}
      onClose={closeModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      {...props}
    >
      {title && (
        <StyledHeader>
          {headerIcon && headerIcon}
          <Typography component={'div'} variant="h6">
            {title}
          </Typography>
          <CloseBtn onClick={closeModal}>
            <CloseIcon {...iconLarge} />
          </CloseBtn>
        </StyledHeader>
      )}

      {reactNode && reactNode}
      {children && children}
    </StyledDialog>
  );
};

export const ModalBody = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  backgroundColor: theme.palette.background.default
}));

interface ModalFooterProps {
  children: React.ReactNode;
}

const StyledFooter = styled('div')({
  background: 'linear-gradient(90deg, #3B687B 0%, #507D90 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  gap: '1rem'
});

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return (
    <StyledFooter>
      <InfoIcon {...iconLarge} fill="#fff" />
      <div>{children}</div>
    </StyledFooter>
  );
};

// ModalButtonPrimary
export const ModalButtonPrimary = styled(({ ...otherProps }) => (
  <Button variant="contained" {...otherProps} />
))(({ theme }) => ({
  backgroundColor: theme.palette.background.brand?.default,
  color: theme.palette.text.inverse
}));

// ModalButtonSecondary
export const ModalButtonSecondary = styled(({ ...otherProps }) => (
  <Button variant="outlined" {...otherProps} />
))(({ theme }) => ({
  '&.MuiButton-outlined': {
    border: `1px solid ${theme.palette.common.white}`,
    color: theme.palette.common?.white,
    '&:hover': {
      background: 'transparent',
      color: theme.palette.common?.white
    }
  }
}));

// ModalButtonTertiary
export const ModalButtonTertiary = styled(({ ...otherProps }) => (
  <Button variant="text" {...otherProps} />
))(({ theme }) => ({
  color: theme.palette.text.inverse
}));
