import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface PageState {
  [key: string]: any;
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

export const { setPage, updatePage } = pageSlice.actions;

// Selectors
export const selectPage = (state: MesheryRootState) => state.page;
export default pageSlice.reducer;
