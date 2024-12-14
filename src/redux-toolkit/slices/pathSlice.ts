import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface PathState {
  [key: string]: any;
}
// Initial state
const initialState: PathState = '';
// Slice
const pathSlice = createSlice({
  name: 'path',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<PathState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setPath } = pathSlice.actions;
// Selectors
export const selectPath = (state: MesheryRootState) => state.path;
export default pathSlice.reducer;
