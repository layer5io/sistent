/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RehydrateStateAction } from './initReduxPersist';

interface PersistedStateProviderProps {
  children: ReactNode;
  loadPersistedState: () => (dispatch: Dispatch<RehydrateStateAction>) => void;
}

/**
 * Dispatches the persisted-state rehydration action on mount and renders
 * children immediately. Returning a different tree on the first render
 * (e.g. `null` while a `loading` flag flips) breaks server-side hydration
 * for any host application that statically pre-renders pages: the server-
 * generated HTML contains the page DOM, the client's first render returns
 * `null`, and the resulting mismatch triggers React's recovery path —
 * which, in Next.js's Pages Router, calls `Router.change` against the
 * current URL and throws "Invariant: attempted to hard navigate to the
 * same URL". The downstream symptom in host apps is a page that never
 * completes its first paint; observed against Meshery Cloud's /login
 * static export (Next.js 16, React 19), where the unhandled promise
 * rejection out of `Router.change` short-circuited `useAuthFlow`'s
 * fetch and left a `<CircularProgress />` running indefinitely.
 *
 * Behaviour change for consumers: components that read rehydrated slices
 * will render once with their initial-state defaults, then re-render
 * after the rehydrate action commits. That's identical to how
 * `redux-persist`'s own `PersistGate` operates in its default
 * (non-blocking) mode, and to how React-Redux selectors behave during
 * a normal mount cycle. If a specific consumer needs to block UI on
 * persisted-state availability it should gate locally on a selector
 * (`useSelector(state => state.<slice>.hydrated)`) rather than have this
 * provider gate the whole tree.
 */
export const PersistedStateProvider: FC<PersistedStateProviderProps> = ({
  children,
  loadPersistedState
}) => {
  const dispatch = useDispatch<ThunkDispatch<any, unknown, RehydrateStateAction>>();

  useEffect(() => {
    try {
      dispatch(loadPersistedState());
    } catch (e) {
      console.error('Error Loading Persisted State', e);
    }
  }, [dispatch, loadPersistedState]);

  return <>{children}</>;
};
