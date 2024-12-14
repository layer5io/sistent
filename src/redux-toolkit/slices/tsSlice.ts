import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface TsState {
  [key: string]: any;
}
// Initial state
const initialState: TsState = new Date(-8640000000000000);
// Slice
const tsSlice = createSlice({
  name: 'ts',
  initialState,
  reducers: {
    setTs: (state, action: PayloadAction<TsState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setTs } = tsSlice.actions;
// Selectors
export const selectTs = (state: MesheryRootState) => state.ts;
export default tsSlice.reducer;
