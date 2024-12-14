import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface ResultState {
  [key: string]: any;
}
// Initial state
const initialState: ResultState = {};
// Slice
const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setResult: (state, action: PayloadAction<ResultState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setResult } = resultSlice.actions;
// Selectors
export const selectResult = (state: MesheryRootState) => state.result;
export default resultSlice.reducer;
