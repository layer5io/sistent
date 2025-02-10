import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface GenState {
  [key: string]: any;
}
// Initial state
const initialState: GenState = 'fortio';
// Slice
const genSlice = createSlice({
  name: 'gen',
  initialState,
  reducers: {
    setGen: (state, action: PayloadAction<GenState>) => {
      return action.payload;
    },
    updateLoadGenConfig: (state: GenState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_GEN_CONFIG
      return state;
    }
  }
});
// Actions
export const { setGen, updateLoadGenConfig } = genSlice.actions;
// Selectors
export const selectGen = (state: MesheryRootState) => state.gen;
export default genSlice.reducer;
