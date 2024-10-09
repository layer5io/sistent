import _ from 'lodash';
import { Dispatch, Store } from 'redux';

const INVALID_REDUCER_PATH = Symbol('INVALID_REDUCER_PATH');
const REHYDRATE_STATE_ACTION = 'REHYDRATE_STATE_ACTION';

export interface RehydrateStateAction {
  type: typeof REHYDRATE_STATE_ACTION;
  payload: {
    reducerPath: string;
    inflatedState: unknown;
  };
}

type Action = RehydrateStateAction | { type: string; [key: string]: unknown };

interface ActionsToPersist {
  [actionType: string]: string[];
}

const rehydrateState = (reducerPath: string, inflatedState: unknown): RehydrateStateAction => ({
  type: REHYDRATE_STATE_ACTION,
  payload: {
    reducerPath,
    inflatedState
  }
});

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

export const initReduxPersist = (actionsToPersist: ActionsToPersist) => {
  const createPersistEnhancedReducer =
    (reducer: (state: unknown, action: Action) => unknown) =>
    (state: unknown, action: Action): unknown => {
      const newState = rehydrateStateReducer(state, action);
      return reducer(newState, action);
    };

  const persistMiddleware =
    (store: Store) =>
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

  const loadPersistedState = () => (dispatch: Dispatch<RehydrateStateAction>) => {
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
