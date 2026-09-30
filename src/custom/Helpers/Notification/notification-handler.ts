import { useSnackbar } from 'notistack';
import React from 'react';

/**
 * The snackbar options this handler forwards. A subset declared here rather
 * than notistack's `OptionsObject`: notistack is bundled into the runtime and is
 * not installed by consumers, so naming its types in the published declarations
 * would reach them as `any`. Forwarding to `enqueueSnackbar` below still checks
 * this against notistack's own type at build time.
 */
export type NotificationHandlerOptions = {
  key?: string | number;
  variant?: 'default' | 'error' | 'success' | 'warning' | 'info';
  autoHideDuration?: number | null;
  persist?: boolean;
  preventDuplicate?: boolean;
};

type NotificationHandler = (message: string, options?: NotificationHandlerOptions) => void;

const useNotificationHandler = (): NotificationHandler => {
  const [message, setMessage] = React.useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (message) {
      enqueueSnackbar(message);
      setMessage('');
    }
  }, [message, enqueueSnackbar]);

  const notify: NotificationHandler = (message, options) => {
    setMessage(message);
    if (options) {
      enqueueSnackbar(message, options);
    }
  };

  return notify;
};

export default useNotificationHandler;
