import { useSnackbar } from 'notistack';

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

/**
 * Returns a `notify` function that enqueues one snackbar per call.
 *
 * It reads the snackbar context of the notistack copy bundled into sistent, not
 * the host's: a host's own `SnackbarProvider` comes from a different copy of
 * notistack, so it does not reach this hook, and under it alone `notify` enqueues
 * into notistack's default context, where nothing is shown.
 */
const useNotificationHandler = (): NotificationHandler => {
  const { enqueueSnackbar } = useSnackbar();

  return (message, options) => {
    enqueueSnackbar(message, options);
  };
};

export default useNotificationHandler;
