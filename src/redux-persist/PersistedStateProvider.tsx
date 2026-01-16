/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch } from '@reduxjs/toolkit';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { RehydrateStateAction } from './initReduxPersist';

interface PersistedStateProviderProps {
  children: ReactNode;
  loadPersistedState: () => (dispatch: Dispatch<RehydrateStateAction>) => void;
}

export const PersistedStateProvider: FC<PersistedStateProviderProps> = ({
  children,
  loadPersistedState
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const dispatch = useDispatch<ThunkDispatch<any, unknown, RehydrateStateAction>>();

  useEffect(() => {
    if (!loading) {
      return;
    }
    
    const loadState = async () => {
      try {
        dispatch(loadPersistedState());
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    
    loadState();
  }, [loading, dispatch, loadPersistedState]);

  if (error) {
    console.error('Error Loading Persisted State', error);
  }

  if (loading) {
    return null;
  }

  return <>{children}</>;
};
