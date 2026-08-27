import { useSnackbar, type OptionsObject, type SnackbarKey, type SnackbarMessage } from 'notistack';
import React from 'react';
import { ProgressBar, type ProgressBarProps } from './ProgressBar';

export interface ShowProgressBarOptions extends Omit<OptionsObject, 'content' | 'key' | 'variant'> {
  /**
   * Initial progress 0-100. Omit or pass a non-finite value (NaN/Infinity) for indeterminate.
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
   * The snackbar stays visible until dismissed or programmatically closed via `close(key)` — it does not auto-close when progress reaches 100.
   */
  show: (options: ShowProgressBarOptions) => SnackbarKey;
  /**
   * Update progress/message of an open snackbar by key. Preserves the original
   * ProgressBar configuration (variant, dismissible, sx, showProgressLabel) and
   * snackbar options (persist, anchorOrigin, autoHideDuration, etc.) from the
   * initial `show` call.
   */
  update: (
    key: SnackbarKey,
    options: Partial<Pick<ProgressBarProps, 'progress' | 'message'>> &
      Partial<ShowProgressBarOptions>
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
 * `update` merges with the original `show` options so variant/sx/persist etc.
 * are not lost.
 *
 * @example
 * const { show, update, close } = useProgressBar();
 * const key = show({ message: 'Uploading...', progress: 0, variant: 'circular', persist: true });
 * update(key, { progress: 42 });
 * close(key);
 */
export const useProgressBar = (): UseProgressBarReturn => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const storeRef = React.useRef<Map<SnackbarKey, ShowProgressBarOptions>>(new Map());

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
      const storedOptions: ShowProgressBarOptions = {
        progress,
        message,
        key,
        persist,
        variant,
        showProgressLabel,
        dismissible,
        sx,
        ...rest
      };

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

      const returnedKey = enqueueSnackbar((message as SnackbarMessage) ?? '', {
        key,
        persist,
        content: content as unknown as OptionsObject['content'],
        ...rest
      });

      const storeKey = key ?? returnedKey;
      storeRef.current.set(storeKey, storedOptions);

      return returnedKey;
    },
    [enqueueSnackbar]
  );

  const update = React.useCallback(
    (
      key: SnackbarKey,
      options: Partial<Pick<ProgressBarProps, 'progress' | 'message'>> &
        Partial<ShowProgressBarOptions>
    ) => {
      const stored = storeRef.current.get(key) ?? {};
      const merged: ShowProgressBarOptions = {
        ...stored,
        ...options,
        key
      };

      const { progress, message, variant, showProgressLabel, dismissible, sx, persist, ...rest } =
        merged;

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

      enqueueSnackbar((message as SnackbarMessage) ?? '', {
        key,
        persist,
        content: content as unknown as OptionsObject['content'],
        ...rest
      });

      storeRef.current.set(key, merged);
    },
    [enqueueSnackbar]
  );

  const close = React.useCallback(
    (key?: SnackbarKey) => {
      if (key !== undefined) storeRef.current.delete(key);
      closeSnackbar(key);
    },
    [closeSnackbar]
  );

  return { show, update, close };
};

export default useProgressBar;
