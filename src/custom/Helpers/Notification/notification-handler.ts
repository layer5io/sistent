import { OptionsObject, useSnackbar } from 'notistack';
import React from 'react';

type NotificationHandler = (message: string, options?: OptionsObject) => void;

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
