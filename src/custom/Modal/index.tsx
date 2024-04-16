import { DialogProps, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Dialog, IconButton, Paper, Typography } from '../../base';
import { ContainedButton, OutlinedButton, TextButton } from '../../base/Button/Button';
import { iconLarge } from '../../constants/iconsSizes';
import { CloseIcon, InfoCircleIcon } from '../../icons';
import { CustomTooltip } from '../CustomTooltip';

interface ModalProps extends DialogProps {
  closeModal: () => void;
  title: string;
  headerIcon: React.ReactNode;
  reactNode: React.ReactNode;
}

interface ModalFooterProps {
  children: React.ReactNode;
  variant?: 'filled' | 'transparent';
  helpText?: string;
}

type openModalCallback = (props: {
  title: string;
  reactNode?: React.ReactNode;
  onClose?: () => void;
}) => void;

interface UseModalReturnI extends ModalProps {
  openModal: openModalCallback;
  isOpen: boolean;
}

const CloseBtn = styled(IconButton)`
  && {
    & svg {
      fill: #fff;
    }
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

export const useModal = ({ headerIcon }: { headerIcon: React.ReactNode }): UseModalReturnI => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>('');

  const onCloseRef = useRef<(() => void) | null>(null);

  const [reactNode, setReactNode] = useState<React.ReactNode | null>(null);

  const openModal: openModalCallback = ({ title, reactNode = null, onClose }) => {
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

  return {
    isOpen: open, // deprecated
    open,
    openModal,
    reactNode,
    title,
    headerIcon,
    closeModal
  };
};

export const ModalBody = styled(Paper)(({ theme }) => ({
  padding: '1rem',
  backgroundColor: theme.palette.background.default
}));

const StyledFooter = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant'
})<ModalFooterProps>(({ theme, variant }) => ({
  background:
    variant == 'filled' ? 'linear-gradient(90deg, #3B687B 0%, #507D90 100%)' : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  gap: '1rem',

  '&& .InfoCircleIcon': {
    color: variant == 'filled' ? theme.palette.common.white : theme.palette.background.info?.default
  }
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
            <CloseIcon {...iconLarge} fill="#fff"></CloseIcon>
          </CloseBtn>
        </StyledHeader>
      )}

      {reactNode && reactNode}
      {children && children}
    </StyledDialog>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({ helpText, children, variant }) => {
  return (
    <StyledFooter variant={variant}>
      {helpText && (
        <CustomTooltip title={helpText} placement="top">
          <IconButton>
            <InfoCircleIcon {...iconLarge} className="InfoCircleIcon" />
          </IconButton>
        </CustomTooltip>
      )}
      <div>{children}</div>
    </StyledFooter>
  );
};

// ModalButtonPrimary
export const ModalButtonPrimary: React.FC = styled(ContainedButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.brand?.default,
  color: theme.palette.text.inverse
}));

// ModalButtonSecondary
export const ModalButtonSecondary = styled(OutlinedButton)(({ theme }) => ({
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
export const ModalButtonTertiary = styled(TextButton)(({ theme }) => ({
  color: theme.palette.text.inverse
}));
