/**
 * React Custom Hook
 * useUpdateMetadata
 * 1. update the page path
 * 2. update the page title
 * 3. update the beta badge status
 */
import { useReducer } from 'react';
import pageSlice, {
  updateBadgeStatus,
  updatePathTitle,
  updatePagePath,
} from '../redux/features/page/page.slice';

const pageReducer = pageSlice.reducer;

export const useUpdateMetadata = () => {
  const [state, dispatch] = useReducer(pageReducer, pageReducer.initialState);

  const setPagePath = (path) => {
    dispatch(updatePagePath({ path }));
  };

  const setPageTite = (title) => {
    dispatch(updatePathTitle({ title }));
  };

  const setBadgeStatus = (badge) => {
    dispatch(updateBadgeStatus({ badge }));
  };

  return {
    state,
    setPagePath,
    setPageTite,
    setBadgeStatus,
  };
};
