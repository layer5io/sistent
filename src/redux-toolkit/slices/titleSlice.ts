import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface TitleState {
  [key: string]: any;
}
// Initial state
const initialState: TitleState = '';
// Slice
const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<TitleState>) => {
      return action.payload;
    },
    updateTitle: (state: TitleState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_TITLE
      return state;
    }
  }
});
// Actions
export const { setTitle, updateTitle } = titleSlice.actions;
// Selectors
export const selectTitle = (state: MesheryRootState) => state.title;
export default titleSlice.reducer;
