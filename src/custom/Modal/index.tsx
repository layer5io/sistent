import { ButtonProps, DialogProps, styled } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Box, Dialog, IconButton, Paper, Typography } from '../../base';
import { ContainedButton, OutlinedButton, TextButton } from '../../base/Button/Button';
import { iconLarge, iconMedium } from '../../constants/iconsSizes';
import { CloseIcon, InfoCircleIcon } from '../../icons';
import { darkModalGradient, lightModalGradient } from '../../theme/colors/colors';
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
  hasHelpText?: boolean;
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

export const CloseBtn = styled(IconButton)`
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
      border-radius: 0.5rem;
    }
  }
`;

export const ModalStyledHeader = styled('div')(({ theme }) => ({
  background: theme.palette.mode === 'light' ? lightModalGradient.header : darkModalGradient.header,
  color: '#eee',
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
  backgroundColor: theme.palette.background.surfaces,
  overflowY: 'auto'
}));

const StyledFooter = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant'
})<ModalFooterProps>(({ theme, variant, hasHelpText }) => ({
  background:
    variant === 'filled'
      ? theme.palette.mode === 'light'
        ? lightModalGradient.fotter
        : darkModalGradient.fotter
      : 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: hasHelpText ? 'space-between' : 'end',
  padding: '1rem',
  gap: '1rem',

  '&& .InfoCircleIcon': {
    color:
      variant === 'filled' ? theme.palette.common.white : theme.palette.background.info?.default
  }
}));

export const Modal: React.FC<ModalProps> = ({
  open,
  closeModal,
  title,
  headerIcon,
  reactNode,
  children,
  maxWidth = 'xs',
  ...props
}) => {
  return (
    <StyledDialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      onClose={closeModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      {...props}
    >
      {title && (
        <ModalStyledHeader>
          {headerIcon && headerIcon}
          <Typography component={'div'} variant="h6">
            {title}
          </Typography>
          <CloseBtn onClick={closeModal}>
            <CloseIcon {...iconLarge} fill="#fff"></CloseIcon>
          </CloseBtn>
        </ModalStyledHeader>
      )}

      {reactNode && reactNode}
      {children && children}
    </StyledDialog>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({ helpText, children, variant }) => {
  return (
    <StyledFooter variant={variant} hasHelpText={!!helpText}>
      {helpText && (
        <CustomTooltip title={helpText} variant="standard" placement="top">
          <IconButton>
            <InfoCircleIcon {...iconMedium} className="InfoCircleIcon" />
          </IconButton>
        </CustomTooltip>
      )}
      {children}
    </StyledFooter>
  );
};

interface ModalButtonPrimaryProps extends ButtonProps {
  isOpen?: boolean;
}

// ModalButtonPrimary
export const ModalButtonPrimary = styled(ContainedButton)<ModalButtonPrimaryProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.brand?.default,
  color: theme.palette.text.constant?.white,
  '&:hover': {
    background: theme.palette.background.brand?.hover
  },
  '&.MuiButton-contained.Mui-disabled': {
    color: theme.palette.text.constant?.disabled,
    backgroundColor: theme.palette.background.constant?.disabled
  }
}));

// ModalButtonSecondary
export const ModalButtonSecondary = styled(OutlinedButton)(({ theme }) => ({
  '&.MuiButton-outlined': {
    border: `1px solid ${theme.palette.background.constant?.white}`,
    color: theme.palette.text.constant?.white,
    backgroundColor: 'transparent',
    '&:hover': {
      background: 'transparent',
      color: theme.palette.text.constant?.white
    }
  },
  '&.MuiButton-outlined.Mui-disabled': {
    color: theme.palette.text.disabled,
    border: 'none',
    backgroundColor: theme.palette.background.brand?.disabled
  }
}));

// ModalButtonTertiary
export const ModalButtonTertiary = styled(TextButton)(({ theme }) => ({
  color: theme.palette.text.inverse
}));

// ModalButtonDanger
export const ModalButtonDanger = styled(ContainedButton)(({ theme }) => ({
  backgroundColor: theme.palette.background.error?.default,
  color: theme.palette.text.constant?.white,
  '&:hover': {
    background: theme.palette.background.error?.hover
  }
}));

const ButtonContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'end',
  gap: '1rem'
}));

interface PrimaryActionButtonsProps {
  primaryText: string;
  secondaryText: string;
  primaryButtonProps?: React.ComponentProps<typeof ModalButtonPrimary>;
  secondaryButtonProps?: React.ComponentProps<typeof ModalButtonSecondary>;
}

export const PrimaryActionButtons: React.FC<PrimaryActionButtonsProps> = ({
  primaryText,
  secondaryText,
  primaryButtonProps,
  secondaryButtonProps
}) => {
  return (
    <ButtonContainer>
      <ModalButtonSecondary {...secondaryButtonProps}>{secondaryText}</ModalButtonSecondary>
      <ModalButtonPrimary {...primaryButtonProps}>{primaryText}</ModalButtonPrimary>
    </ButtonContainer>
  );
};
