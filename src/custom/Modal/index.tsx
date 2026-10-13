import { ButtonProps, DialogOwnerState, DialogProps, PaperProps, styled } from '@mui/material';
// Stable per-instance id across React 17/18/19 (same hook MUI Dialog uses
// internally; on React 17 the generated id appears after the first effect).
import { unstable_useId as useId } from '@mui/material/utils';
import React, { useRef, useState } from 'react';
import { Box, Dialog, IconButton, Paper, Typography } from '../../base';
import { ContainedButton, OutlinedButton, TextButton } from '../../base/Button/Button';
import { iconLarge } from '../../constants/iconsSizes';
import { CloseIcon, FullScreenIcon } from '../../icons';
import FullScreenExitIcon from '../../icons/Fullscreen/FullScreenExitIcon';
import { CustomTooltip } from '../CustomTooltip';
import { HelperTextPopover } from '../HelperTextPopover';

interface BaseModalProps extends Omit<DialogProps, 'title'> {
  closeModal: () => void;
  headerIcon?: React.ReactNode;
  reactNode?: React.ReactNode;
  isFullScreenModeAllowed?: boolean;
}

export type ModalProps = BaseModalProps &
  (
    | {
        /**
         * Visible title for the modal. Automatically wired to aria-labelledby on the dialog paper.
         * Note on precedence: when both `title` and `aria-label` are provided, `aria-labelledby`
         * (pointing to the title) takes precedence per the W3C Accessible Name (accname) specification;
         * `aria-label` is intentionally not rendered on the dialog paper.
         */
        title: string;
        'aria-label'?: string;
        'aria-labelledby'?: string;
      }
    | {
        /** Titleless modal with explicit aria-label for assistive technologies. */
        title?: string;
        'aria-label': string;
        'aria-labelledby'?: string;
      }
    | {
        /** Titleless modal with explicit aria-labelledby reference. */
        title?: string;
        'aria-label'?: string;
        'aria-labelledby': string;
      }
  );

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

export interface UseModalReturnI extends BaseModalProps {
  title: string;
  openModal: openModalCallback;
  isOpen: boolean;
  open: boolean;
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
      overflow: hidden;
    }
  }
`;

export const FullscreenBtn = styled(IconButton)`
  && {
    padding: 0;
    color: ${({ theme }) => theme.palette.common.white};
    cursor: pointer;

    & svg {
      height: 2.25rem;
      width: 2.25rem;
      fill: #fff;
    }
  }
`;

export const ModalStyledHeader = styled('div')(({ theme }) => ({
  background: theme.palette.surface.tint,
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
    const validTitle =
      typeof title === 'string' && title.trim().length > 0 ? title.trim() : undefined;
    if (!validTitle) {
      if (typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production') {
        console.warn(
          'useModal: openModal rejected. A non-empty title is required to ensure an accessible dialog name.'
        );
      }
      return;
    }
    setTitle(validTitle);
    onCloseRef.current = onClose ?? null;
    setOpen(true);
    setReactNode(reactNode ?? null);
  };

  const closeModal = () => {
    setOpen(false);
    if (onCloseRef.current) onCloseRef.current();
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
  backgroundColor: theme.palette.surface.primary,
  overflowY: 'auto',
  height: '100%',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const StyledFooter = styled('div', {
  // Both are styling-only props; neither may reach the DOM node (otherwise React
  // warns "unknown prop hasHelpText on a DOM element").
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'hasHelpText'
})<ModalFooterProps>(({ theme, variant, hasHelpText }) => ({
  background: variant === 'filled' ? theme.palette.surface.tint : 'transparent',
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

declare const process:
  | {
      env?: {
        NODE_ENV?: string;
      };
    }
  | undefined;

const getNonEmptyString = (val: unknown): string | undefined => {
  if (typeof val === 'string' && val.trim().length > 0) {
    return val.trim();
  }
  return undefined;
};

const deriveTitleIdBase = (rawId: unknown): string | undefined => {
  if (typeof rawId !== 'string') return undefined;
  const trimmed = rawId.trim();
  if (trimmed.length === 0) return undefined;
  // If the ID contains no whitespace, preserve the clean human-readable token
  if (!/\s/.test(trimmed)) {
    return `${trimmed}-title`;
  }
  // Injective encoding: escape '_' as '_x5f_', then encode whitespace chars to hex tokens.
  // This prevents collision between e.g. "my custom modal" and "my-custom-modal".
  const encoded = trimmed
    .replace(/_/g, '_x5f_')
    .replace(/\s/g, (ch) => `_x${ch.charCodeAt(0).toString(16).padStart(2, '0')}_`);
  return `${encoded}-title`;
};

export const Modal: React.FC<ModalProps> = (allProps) => {
  const {
    open,
    closeModal,
    title,
    headerIcon,
    reactNode,
    children,
    maxWidth = 'xs',
    isFullScreenModeAllowed,
    ...props
  } = allProps;

  /*
   * Use the incoming fullScreen prop only as the initial state.
   * After initialization, fullscreen is managed internally so, external
   * fullScreen prop values do not override user-triggered fullscreen toggles.
   * fullWidth is derived from fullScreen on StyledDialog below; that explicit
   * prop is applied after {...restProps}, so any caller-provided fullWidth is
   * intentionally overridden without needing to strip it here.
   */
  const {
    fullScreen: initialFullScreenState = false,
    'aria-label': resolvedAriaLabel,
    'aria-labelledby': callerAriaLabelledby,
    'aria-describedby': callerAriaDescribedby,
    slotProps: callerSlotProps,
    ...rawRestProps
  } = props;

  // Safely strip useModal helper properties so they do not leak onto the Dialog DOM element
  const restProps = { ...rawRestProps };
  delete (restProps as { isOpen?: unknown }).isOpen;
  delete (restProps as { openModal?: unknown }).openModal;

  const effectiveTitle = getNonEmptyString(title);
  const hasVisibleTitle = Boolean(effectiveTitle);

  const titleIdOverride = deriveTitleIdBase(restProps.id);
  const titleId = useId(titleIdOverride);

  const [fullScreen, setFullScreen] = useState(initialFullScreenState);
  const hasWarnedRef = useRef(false);

  const toggleFullScreen = () => {
    setFullScreen((prev) => !prev);
  };

  const modalAriaLabelledby = getNonEmptyString(callerAriaLabelledby);
  const modalAriaLabel = getNonEmptyString(resolvedAriaLabel);
  const modalAriaDescribedby = getNonEmptyString(callerAriaDescribedby);

  const callerPaperProp = callerSlotProps?.paper;

  // Merges Paper accessibility attributes while strictly preserving caller's
  // object-valued or callback-valued slotProps.paper.
  const mergePaperAttributes = (baseProps: Partial<PaperProps> = {}): Partial<PaperProps> => {
    const paperAriaLabelledby = getNonEmptyString(baseProps['aria-labelledby']);
    const paperAriaLabel = getNonEmptyString(baseProps['aria-label']);
    const paperAriaDescribedby = getNonEmptyString(baseProps['aria-describedby']);

    // Precedence Matrix:
    // 1. Modal aria-labelledby (highest priority)
    // 2. Visible title: paper aria-labelledby ?? titleId (aria-label suppressed per accname)
    // 3. Modal aria-label (titleless: Modal prop overrides slotProps.paper)
    // 4. Paper aria-labelledby (titleless fallback)
    // 5. Paper aria-label (titleless fallback)
    let finalLabelledby: string | undefined;
    let finalLabel: string | undefined;

    if (modalAriaLabelledby) {
      finalLabelledby = modalAriaLabelledby;
    } else if (hasVisibleTitle) {
      finalLabelledby = paperAriaLabelledby ?? titleId;
    } else if (modalAriaLabel) {
      finalLabel = modalAriaLabel;
    } else if (paperAriaLabelledby) {
      finalLabelledby = paperAriaLabelledby;
    } else if (paperAriaLabel) {
      finalLabel = paperAriaLabel;
    }

    // Precedence: Modal aria-describedby > Paper aria-describedby
    const finalDescribedby = modalAriaDescribedby ?? paperAriaDescribedby;

    const hasAccessibleName = Boolean(finalLabelledby || finalLabel);
    if (!open || hasAccessibleName) {
      hasWarnedRef.current = false;
    } else if (
      typeof process !== 'undefined' &&
      process?.env?.NODE_ENV !== 'production' &&
      !hasWarnedRef.current
    ) {
      hasWarnedRef.current = true;
      console.warn(
        'Modal: Dialog is rendered without an accessible name. Provide a non-empty `title`, `aria-label`, or `aria-labelledby`.'
      );
    }

    return {
      ...baseProps,
      // Suppress dangling auto-generated aria-labelledby on the dialog paper when
      // neither title nor an explicit aria-labelledby is provided.
      'aria-labelledby': finalLabelledby,
      'aria-label': finalLabel,
      'aria-describedby': finalDescribedby
    };
  };

  const resolvedPaperSlotProps =
    typeof callerPaperProp === 'function'
      ? (ownerState: DialogOwnerState) =>
          mergePaperAttributes(callerPaperProp(ownerState) as Partial<PaperProps>)
      : mergePaperAttributes(callerPaperProp as Partial<PaperProps> | undefined);

  const mergedSlotProps = {
    ...callerSlotProps,
    paper: resolvedPaperSlotProps
  };

  return (
    <StyledDialog
      {...restProps}
      maxWidth={maxWidth}
      open={open}
      onClose={closeModal}
      slotProps={mergedSlotProps}
      fullScreen={fullScreen}
      fullWidth={!fullScreen}
    >
      {hasVisibleTitle && (
        <ModalStyledHeader className="modal-header" data-testid="modal-header">
          {headerIcon && <Box data-testid="modal-header-icon">{headerIcon}</Box>}
          <Typography component={'div'} variant="h6" data-testid="modal-title" id={titleId}>
            {effectiveTitle}
          </Typography>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
            data-testid="modal-header-actions"
          >
            {isFullScreenModeAllowed && (
              <CustomTooltip title={fullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}>
                <FullscreenBtn
                  onClick={toggleFullScreen}
                  data-testid={
                    fullScreen ? 'modal-exit-fullscreen-btn' : 'modal-enter-fullscreen-btn'
                  }
                  aria-label={fullScreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {fullScreen ? <FullScreenExitIcon /> : <FullScreenIcon />}
                </FullscreenBtn>
              </CustomTooltip>
            )}
            <CustomTooltip title="Close dialog">
              <CloseBtn
                onClick={closeModal}
                className="modal-close-btn"
                data-testid="modal-close-btn"
                aria-label="Close dialog"
              >
                <CloseIcon {...iconLarge} fill="#fff"></CloseIcon>
              </CloseBtn>
            </CustomTooltip>
          </div>
        </ModalStyledHeader>
      )}

      {reactNode && reactNode}
      {children && children}
    </StyledDialog>
  );
};

export const ModalFooter: React.FC<ModalFooterProps> = ({ helpText, children, variant }) => {
  return (
    <StyledFooter className="modal-footer" variant={variant} hasHelpText={!!helpText}>
      {helpText && (
        // <CustomTooltip title={helpText} variant="standard" placement="top">
        //   <IconButton>
        //     <InfoCircleIcon {...iconMedium} className="InfoCircleIcon" />
        //   </IconButton>
        // </CustomTooltip>
        <HelperTextPopover content={helpText} />
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
