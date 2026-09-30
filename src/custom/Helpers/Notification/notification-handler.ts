import { OptionsObject, useSnackbar } from 'notistack';
import React from 'react';

export type NotificationHandler = (message: string, options?: OptionsObject) => void;

/**
 * Returns a `notify(message, options?)` function that enqueues a snackbar in the
 * nearest notistack `SnackbarProvider`.
 *
 * notistack is a peer dependency, not a bundled one: `useSnackbar` reads a
 * React context, and a bundled copy of notistack would own a private context
 * that the host's `SnackbarProvider` never populates, so every `notify` would
 * silently do nothing. The host must render its own `SnackbarProvider` above
 * any component that calls this hook.
 */
const useNotificationHandler = (): NotificationHandler => {
  const { enqueueSnackbar } = useSnackbar();

  return React.useCallback<NotificationHandler>(
    (message, options) => {
      enqueueSnackbar(message, options);
    },
    [enqueueSnackbar]
  );
};

export default useNotificationHandler;
