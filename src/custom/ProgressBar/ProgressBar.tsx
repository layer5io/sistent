import { SnackbarContent, useSnackbar, type CustomContentProps } from 'notistack';
import React from 'react';
import { CircularProgress } from '../../base/CircularProgress';
import { LinearProgress } from '../../base/LinearProgress';
import { CloseIcon } from '../../icons';
import {
  CloseButtonWrapper,
  ProgressBarContent,
  ProgressBarHeader,
  ProgressBarLabel,
  ProgressBarMessage,
  ProgressBarTrack,
  ProgressBarWrapper
} from './style';

export type ProgressBarVariant = 'linear' | 'circular';

export interface ProgressBarProps extends Omit<Partial<CustomContentProps>, 'variant'> {
  id: CustomContentProps['id'];
  /**
   * Progress value 0-100. When undefined or non-finite (NaN/Infinity) the bar renders indeterminate.
   * Values outside 0-100 are clamped.
   * @default undefined (indeterminate)
   */
  progress?: number;
  /**
   * Message / title shown alongside the progress indicator.
   */
  message?: React.ReactNode;
  /**
   * Which base primitive to use for progress rendering.
   * @default 'linear'
   */
  variant?: ProgressBarVariant;
  /**
   * Show numeric percentage label next to the message (linear variant only).
   * @default true when progress is determinate
   */
  showProgressLabel?: boolean;
  /**
   * Allow dismiss via close button. When false the close button is hidden.
   * @default true
   */
  dismissible?: boolean;
  /**
   * Additional sx for the outer wrapper.
   */
  sx?: React.ComponentProps<typeof ProgressBarWrapper>['sx'];
}

const clampProgress = (value: number): number => Math.min(100, Math.max(0, value));

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      id,
      progress,
      message,
      variant = 'linear',
      showProgressLabel,
      dismissible = true,
      sx,
      style,
      ...props
    },
    ref
  ) => {
    const { closeSnackbar } = useSnackbar();

    const isDeterminate = typeof progress === 'number' && Number.isFinite(progress);
    const normalizedProgress = isDeterminate ? clampProgress(progress as number) : undefined;
    const shouldShowLabel = (showProgressLabel ?? isDeterminate) && variant === 'linear';

    const handleClose = React.useCallback(() => {
      closeSnackbar(id);
    }, [closeSnackbar, id]);

    const renderProgress = () => {
      if (variant === 'circular') {
        if (isDeterminate) {
          return <CircularProgress variant="determinate" value={normalizedProgress} size={28} />;
        }
        return <CircularProgress size={28} />;
      }

      if (isDeterminate) {
        return <LinearProgress variant="determinate" value={normalizedProgress} />;
      }
      return <LinearProgress variant="indeterminate" />;
    };

    return (
      <SnackbarContent ref={ref} role="alert" style={style} {...props}>
        <ProgressBarWrapper sx={sx}>
          {variant === 'circular' && renderProgress()}
          <ProgressBarContent>
            {(message || (shouldShowLabel && isDeterminate)) && (
              <ProgressBarHeader>
                {message && <ProgressBarMessage>{message}</ProgressBarMessage>}
                {shouldShowLabel && isDeterminate && (
                  <ProgressBarLabel>{`${Math.round(normalizedProgress as number)}%`}</ProgressBarLabel>
                )}
              </ProgressBarHeader>
            )}
            {variant === 'linear' && <ProgressBarTrack>{renderProgress()}</ProgressBarTrack>}
          </ProgressBarContent>
          {dismissible && (
            <CloseButtonWrapper
              type="button"
              aria-label="close"
              onClick={handleClose}
              data-testid="progress-bar-close"
            >
              <CloseIcon width={18} height={18} />
            </CloseButtonWrapper>
          )}
        </ProgressBarWrapper>
      </SnackbarContent>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
