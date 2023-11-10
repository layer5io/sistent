import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

const ReduxContext = React.createContext({});

export function useRedux() {
  return React.useContext(ReduxContext);
}

export function ReduxProvider({ children }: ReduxProviderProps): JSX.Element {
  return (
    <Provider store={store}>
      <ReduxContext.Provider value={store}>{children}</ReduxContext.Provider>
    </Provider>
  );
}
