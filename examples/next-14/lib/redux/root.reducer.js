import { combineReducers } from 'redux';
import { api } from './rtk-query/config';
import navSlice from './features/navigator/nav.slice';
import pageSlice from './features/page/page.slice';
import progressSlice from './features/progress/progress.slice';
import eventsSlice from './features/events/events.slice';
import usersSlice from './features/user/user.slice';
import k8sConfigSlice from './features/config/k8sConfig.slice';
import contextsSlice from './features/contexts/contexts.slice';
import providerSlice from './features/provider/provider.slice';
import sessionSlice from './features/session/session.slice';
import connectionSlice from './features/connection/connection.slice';

export const rootReducer = (state, action) => {
  const reducers = combineReducers({
    [api.reducerPath]: api.reducer,
    // [themeSlice.name]: themeSlice.reducer,
    [navSlice.name]: navSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [providerSlice.name]: providerSlice.reducer,
    [sessionSlice.name]: sessionSlice.reducer,
    [progressSlice.name]: progressSlice.reducer,
    [pageSlice.name]: pageSlice.reducer,
    [k8sConfigSlice.name]: k8sConfigSlice.reducer,
    [eventsSlice.name]: eventsSlice.reducer,
    [contextsSlice.name]: contextsSlice.reducer,
    [connectionSlice.name]: connectionSlice.reducer,
  });
  if (action.type === 'HYDRATE') {
    return reducers(
      {
        ...state,
        ...action.payload,
      },
      action,
    );
  }
  return reducers(state, action);
};
