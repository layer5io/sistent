import { OptionsObject, useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

type NotificationHandler = (message: string, options?: OptionsObject) => void;

const useNotificationHandler = (): NotificationHandler => {
  const [message, setMessage] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
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
