import { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, store } from '../redux/store';

const ReduxContext = createContext(store);

export function useReduxState<T>(selector: (state: RootState) => T): T {
  const store = useContext(ReduxContext);
  return useSelector(selector);
}

export function useReduxDispatch(): AppDispatch {
  const store = useContext(ReduxContext);
  return useDispatch();
}
