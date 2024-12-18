import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface ShowProgressState {
  [key: string]: any;
}
// Initial state
const initialState: ShowProgressState = false;
// Slice
const showProgressSlice = createSlice({
  name: 'showProgress',
  initialState,
  reducers: {
    setShowProgress: (state, action: PayloadAction<ShowProgressState>) => {
      return action.payload;
    },
    updateProgress: (state: ShowProgressState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_PROGRESS
      return state;
    }
  }
});
// Actions
export const { setShowProgress, updateProgress } = showProgressSlice.actions;
// Selectors
export const selectShowProgress = (state: MesheryRootState) => state.showProgress;
export default showProgressSlice.reducer;
