import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface CState {
  [key: string]: any;
}
// Initial state
const initialState: CState = 0;
// Slice
const cSlice = createSlice({
  name: 'c',
  initialState,
  reducers: {
    setC: (state, action: PayloadAction<CState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setC } = cSlice.actions;
// Selectors
export const selectC = (state: MesheryRootState) => state.c;
export default cSlice.reducer;
