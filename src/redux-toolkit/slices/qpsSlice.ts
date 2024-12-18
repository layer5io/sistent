import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface QpsState {
  [key: string]: any;
}
// Initial state
const initialState: QpsState = 0;
// Slice
const qpsSlice = createSlice({
  name: 'qps',
  initialState,
  reducers: {
    setQps: (state, action: PayloadAction<QpsState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setQps } = qpsSlice.actions;
// Selectors
export const selectQps = (state: MesheryRootState) => state.qps;
export default qpsSlice.reducer;
