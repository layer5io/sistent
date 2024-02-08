import { rootReducer } from './root.reducer';
import { api } from './rtk-query/config';
import { configureStore } from '@reduxjs/toolkit';

export const store = () => {
  const newStore = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
  });

  return newStore;
};
