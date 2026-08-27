import { useSnackbar, type OptionsObject, type SnackbarKey } from 'notistack';
import React from 'react';
import { ProgressBar, type ProgressBarProps } from './ProgressBar';

export interface ShowProgressBarOptions extends Omit<OptionsObject, 'content' | 'key' | 'variant'> {
  /**
   * Initial progress 0-100. Omit for indeterminate.
   */
  progress?: number;
  message?: React.ReactNode;
  /**
   * Snackbar key. Auto-generated when not provided.
   */
  key?: SnackbarKey;
  variant?: ProgressBarProps['variant'];
  showProgressLabel?: boolean;
  dismissible?: boolean;
  sx?: ProgressBarProps['sx'];
}

export interface UseProgressBarReturn {
  /**
   * Show a persistent progress snackbar. Returns its key.
   */
  show: (options: ShowProgressBarOptions) => SnackbarKey;
  /**
   * Update progress/message of an open snackbar by key.
   */
  update: (
    key: SnackbarKey,
    options: Partial<Pick<ProgressBarProps, 'progress' | 'message'>>
  ) => void;
  /**
   * Close snackbar by key.
   */
  close: (key?: SnackbarKey) => void;
}

/**
 * Imperative helper for the ProgressBar snackbar pattern.
 * Wraps notistack's enqueueSnackbar/closeSnackbar so progress can be
 * updated while the toast is visible without the caller managing keys manually.
 *
 * @example
 * const { show, update, close } = useProgressBar();
 * const key = show({ message: 'Uploading...', progress: 0, persist: true });
 * update(key, { progress: 42 });
 * close(key);
 */
export const useProgressBar = (): UseProgressBarReturn => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const show = React.useCallback(
    ({
      progress,
      message,
      key,
      persist = true,
      variant,
      showProgressLabel,
      dismissible,
      sx,
      ...rest
    }: ShowProgressBarOptions): SnackbarKey => {
      const content = (id: SnackbarKey) =>
        React.createElement(ProgressBar, {
          id,
          progress,
          message,
          variant,
          showProgressLabel,
          dismissible,
          sx
        });

      return enqueueSnackbar((message as string) ?? '', {
        key,
        persist,
        content: content as unknown as OptionsObject['content'],
        ...rest
      });
    },
    [enqueueSnackbar]
  );

  const update = React.useCallback(
    (key: SnackbarKey, options: Partial<Pick<ProgressBarProps, 'progress' | 'message'>>) => {
      const { progress, message } = options;
      const content = (id: SnackbarKey) =>
        React.createElement(ProgressBar, {
          id,
          progress,
          message
        });

      enqueueSnackbar((message as string) ?? '', {
        key,
        persist: true,
        content: content as unknown as OptionsObject['content']
      });
    },
    [enqueueSnackbar]
  );

  const close = React.useCallback(
    (key?: SnackbarKey) => {
      closeSnackbar(key);
    },
    [closeSnackbar]
  );

  return { show, update, close };
};

export default useProgressBar;
