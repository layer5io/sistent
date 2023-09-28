import { ReactNode, createContext, useContext } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

type ReduxProviderProps = {
  children: ReactNode;
};

const ReduxContext = createContext({});

export function useRedux() {
  return useContext(ReduxContext);
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
    </Provider>
  );
}
