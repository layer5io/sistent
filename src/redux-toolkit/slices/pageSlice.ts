import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface PageState {
  path: string;
  title: string;
  isBeta: boolean;
}

const initialState: PageState = {
  path: '',
  title: '',
  isBeta: false
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<PageState>) => {
      return action.payload;
    },
    updatePage: (state: PageState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_PAGE
      return state;
    }
  }
});

export const { setPage } = pageSlice.actions;

// Thunk action creator
export const updatePage = (payload: PageState) => (dispatch: MesheryReduxAppDispatch) => {
  dispatch(setPage(payload));
};

// Selectors
export const selectPage = (state: MesheryRootState) => state.page;
export default pageSlice.reducer;
