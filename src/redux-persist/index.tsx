/* eslint-disable @typescript-eslint/no-explicit-any */

import _ from 'lodash';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

const INVALID_REDUCER_PATH = Symbol('INVALID_REDUCER_PATH');
const REHYDRATE_STATE_ACTION = 'REHYDRATE_STATE_ACTION';

// Define types for the actions
interface RehydrateStateAction {
  type: typeof REHYDRATE_STATE_ACTION;
  payload: {
    reducerPath: string;
    inflatedState: unknown;
  };
}

type Action = RehydrateStateAction | { type: string; [key: string]: unknown };

// Define the shape of the actionsToPersist object
interface ActionsToPersist {
  [actionType: string]: string[];
}

/**
 * Creates an action to rehydrate state.
 *
 * @param {string} reducerPath - The path of the reducer to rehydrate.
 * @param {unknown} inflatedState - The state to rehydrate with.
 * @returns {RehydrateStateAction} An action object for rehydrating state.
 */
const rehydrateState = (reducerPath: string, inflatedState: unknown): RehydrateStateAction => {
  return {
    type: REHYDRATE_STATE_ACTION,
    payload: {
      reducerPath,
      inflatedState
    }
  };
};

/**
 * Reducer to handle state rehydration during Redux store updates.
 * This reducer intercepts a specific action type to rehydrate the state of specified reducers.
 *
 * @param {unknown} state - The current state.
 * @param {Action} action - The dispatched action.
 * @returns {unknown} The new state after rehydration.
 */
const rehydrateStateReducer = (state: unknown, action: Action): unknown => {
  if (action.type === REHYDRATE_STATE_ACTION) {
    const appState = _.cloneDeep(state);
    _.set(
      appState as object,
      (action.payload as RehydrateStateAction['payload']).reducerPath.split('/'),
      (action.payload as RehydrateStateAction['payload']).inflatedState
    );
    return appState;
  }
  return state;
};

/**
 * Initializes Redux persistence with given actions to persist on
 *
 * @param {ActionsToPersist} actionsToPersist - An object mapping action types to arrays of reducer paths.
 * Each action type is associated with an array of reducer paths whose state should be persisted.
 * @returns {Object} An object containing Redux persistence functions.
 */
export const initReduxPersist = (actionsToPersist: ActionsToPersist) => {
  /**
   * Creates a new reducer with enhanced state rehydration logic for Redux persistence.
   * This function returns a new reducer that first rehydrates the state using the
   * rehydrateStateReducer, and then applies the original reducer to the rehydrated state.
   *
   * @param {function} reducer - The original reducer function to enhance.
   * @returns {function} A new enhanced reducer function with added state rehydration.
   */
  const createPersistEnhancedReducer =
    (reducer: (state: unknown, action: Action) => unknown) =>
    (state: unknown, action: Action): unknown => {
      const newState = rehydrateStateReducer(state, action);
      return reducer(newState, action);
    };

  /**
   * Redux middleware to persist state to local storage based on dispatched actions.
   * This middleware listens for specific actions and saves the relevant state to local storage.
   *
   * @param {any} store - The Redux store.
   * @returns {Function} A middleware function.
   */
  const persistMiddleware =
    (store: any) =>
    (next: (action: Action) => unknown) =>
    (action: Action): unknown => {
      const result = next(action);

      const reducersToPersist = actionsToPersist[action.type];

      if (reducersToPersist) {
        const appState = store.getState();
        reducersToPersist.forEach((reducerPath) => {
          const path = reducerPath.split('/');
          const stateToPersist = _.get(appState, path, INVALID_REDUCER_PATH);

          if (stateToPersist === INVALID_REDUCER_PATH) {
            throw new Error(`Reducer Path to Persist Is Invalid: ${reducerPath}`);
          }

          localStorage.setItem(reducerPath, JSON.stringify(stateToPersist));
        });
      }
      return result;
    };

  /**
   * Action creator to load persisted state from local storage during Redux store initialization.
   * This function retrieves previously saved state from local storage and dispatches rehydration actions.
   *
   * @returns {Function} A thunk function.
   */
  const loadPersistedState = () => (dispatch: Dispatch) => {
    Object.values(actionsToPersist).forEach((reducerPaths) => {
      reducerPaths.forEach((path) => {
        let inflatedState = localStorage.getItem(path);
        try {
          if (inflatedState) {
            inflatedState = JSON.parse(inflatedState);
            dispatch(rehydrateState(path, inflatedState));
          }
        } catch (e) {
          console.error(`Error rehydrating state for reducer ${path}`, inflatedState);
        }
      });
    });
  };

  return {
    persistMiddleware,
    createPersistEnhancedReducer,
    loadPersistedState
  };
};

// Define types for PersistedStateProvider props
interface PersistedStateProviderProps {
  children: ReactNode;
  loadPersistedState: () => (dispatch: Dispatch) => void;
}

export const PersistedStateProvider: FC<PersistedStateProviderProps> = ({
  children,
  loadPersistedState
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      return;
    }
    try {
      dispatch(loadPersistedState() as any);
    } catch (e) {
      setError(e as Error);
    }
    setLoading(false);
  }, [loading, dispatch, loadPersistedState]);

  error && console.error('Error Loading Persisted State', error);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};
