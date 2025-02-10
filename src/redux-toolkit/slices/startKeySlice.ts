import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface StartKeyState {
  [key: string]: any;
}
// Initial state
const initialState: StartKeyState = '';
// Slice
const startKeySlice = createSlice({
  name: 'startKey',
  initialState,
  reducers: {
    setStartKey: (state, action: PayloadAction<StartKeyState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setStartKey } = startKeySlice.actions;
// Selectors
export const selectStartKey = (state: MesheryRootState) => state.startKey;
export default startKeySlice.reducer;
