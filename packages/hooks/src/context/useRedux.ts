import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../redux/store';

const ReduxContext = React.createContext(store);

export function useReduxState<T>(selector: (state: RootState) => T): T {
  const store = React.useContext(ReduxContext);
  return useSelector(selector);
}

export function useReduxDispatch(): AppDispatch {
  const store = React.useContext(ReduxContext);
  return useDispatch();
}
