import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface TState {
  [key: string]: any;
}
// Initial state
const initialState: TState = '30s';
// Slice
const tSlice = createSlice({
  name: 't',
  initialState,
  reducers: {
    setT: (state, action: PayloadAction<TState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setT } = tSlice.actions;
// Selectors
export const selectT = (state: MesheryRootState) => state.t;
export default tSlice.reducer;
