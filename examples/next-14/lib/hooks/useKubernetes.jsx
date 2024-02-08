import { useDispatch } from 'react-redux';
import { updateProgress } from '../redux/features/progress/progress.slice';
import { useNotification } from './useNotification';
import { NOTIFICATION_EVENT_TYPES } from '@/utils/constants/notification';

/**
 * Function signature for a notification function.
 * @typedef {Object} NotifyFunction
 * @property {string} message - The message to be displayed in the notification.
 * @property {string} [details] - Additional details to be displayed in the notification.
 * @property {string} event_type - The type of event for the notification.
 */

/**
 * Function signature for a callback function.
 * @template T
 * @callback CallbackFunction
 * @param {T} arg - The argument for the callback function.
 */

/**
 * Arguments for generating a success handler.
 * @template T
 * @typedef {Object} SuccessHandlerGeneratorArgs
 * @property {NotifyFunction} notify - The notification function.
 * @property {string} msg - The message to be displayed in the success notification.
 * @property {CallbackFunction<T>} [cb] - Optional callback function to be executed.
 */

/**
 * Arguments for generating an error handler.
 * @typedef {Object} ErrorHandlerGeneratorArgs
 * @property {NotifyFunction} notify - The notification function.
 * @property {string} msg - The message to be displayed in the error notification.
 * @property {CallbackFunction<any>} [cb] - Optional callback function to be executed.
 */

/**
 * Generates a success handler.
 * @template T
 * @param {SuccessHandlerGeneratorArgs<T>} param0 - Arguments for generating the success handler.
 * @returns {CallbackFunction<T>} - The generated success handler.
 */
export const successHandlerGenerator =
  ({ notify, msg, cb }) =>
  (res) => {
    if (res !== undefined) {
      if (cb !== undefined) cb(res);
      if (typeof res == 'object') {
        res = JSON.stringify(res);
      }
      notify({
        message: `${msg}`,
        details: `${res}`,
        event_type: NOTIFICATION_EVENT_TYPES.SUCCESS,
      });
    }
  };

/**
 * Generates an error handler.
 * @param {ErrorHandlerGeneratorArgs} param0 - Arguments for generating the error handler.
 * @returns {CallbackFunction<any>} - The generated error handler.
 */
export const errorHandlerGenerator =
  ({ notify, msg, cb }) =>
  (err) => {
    if (cb !== undefined) cb(err);
    err = typeof err !== 'string' ? err.toString() : err;
    notify({
      message: `${msg}`,
      details: err,
      event_type: NOTIFICATION_EVENT_TYPES.ERROR,
    });
  };

/**
 * Custom hook for handling Kubernetes operations.
 * @returns {Function} - Function to ping Kubernetes.
 */
export default function useKubernetesHook() {
  const { notify } = useNotification();
  const dispatch = useDispatch();

  /**
   * Function to ping a Kubernetes server.
   * @param {string} name - The name of the Kubernetes context.
   * @param {string} server - The server URL of the Kubernetes context.
   * @param {string} connectionID - The ID of the Kubernetes connection.
   */
  const ping = (name, server, connectionID) => {
    dispatch(updateProgress({ showProgress: true }));
    pingKubernetes(
      successHandlerGenerator(
        { notify, msg: `Kubernetes context ${name} at ${server} pinged` },
        () => dispatch(updateProgress({ showProgress: false })),
      ),
      errorHandlerGenerator(
        { notify, msg: `Kubernetes context ${name} at ${server} not reachable` },
        () => dispatch(updateProgress({ showProgress: false })),
      ),
      connectionID,
    );
  };

  return ping;
}
