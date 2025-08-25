import React from 'react';

type StateCallback<T> = (state: T) => void;
type SetStateCallback<T> = (state: T, callback?: StateCallback<T>) => void;
type GetStateRefValue<T> = () => T;

/**
 * Custom hook that provides state management with callback support
 *
 * This hook extends React's useState to support:
 * - Callback execution after state updates
 * - Change tracking callback for all state changes
 * - Access to current state value via ref
 *
 * @template T - The type of the state value
 * @param initState - Initial state value
 * @param changeTrackCB - Optional callback that runs on every state change
 * @returns Tuple containing [state, setState, getStateRefValue]
 */
function useStateCB<T>(
  initState: T,
  changeTrackCB?: StateCallback<T>
): [T, SetStateCallback<T>, GetStateRefValue<T>] {
  const [state, _setState] = React.useState<T>(initState);
  const stateRef = React.useRef<T>(initState);

  const callbackRef = React.useRef<StateCallback<T> | undefined>();
  const changeTrackCBRef = React.useRef<StateCallback<T> | undefined>(changeTrackCB);
  const isFirstCBCall = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (isFirstCBCall.current) {
      isFirstCBCall.current = false;
    } else {
      callbackRef.current?.(state);
      changeTrackCBRef.current?.(state);
    }
  }, [state]);

  const setState: SetStateCallback<T> = (newState: T, callback?: StateCallback<T>) => {
    callbackRef.current = callback;
    stateRef.current = newState;
    _setState(newState);
  };

  const getStateRefValue: GetStateRefValue<T> = () => stateRef.current;

  return [state, setState, getStateRefValue];
}

export default useStateCB;
