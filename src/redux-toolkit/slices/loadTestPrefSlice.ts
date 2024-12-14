import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface LoadTestPrefState {
  [key: string]: any;
}
// Initial state
const initialState: LoadTestPrefState = {
  qps: 0,
  t: '30s',
  c: 0,
  gen: 'fortio',
  ts: new Date()
};
// Slice
const loadTestPrefSlice = createSlice({
  name: 'loadTestPref',
  initialState,
  reducers: {
    setLoadTestPref: (state, action: PayloadAction<LoadTestPrefState>) => {
      return action.payload;
    },
    updateLoadTestData: (state: LoadTestPrefState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_TEST_DATA
      return state;
    },
    updateLoadGenConfig: (state: LoadTestPrefState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_GEN_CONFIG
      return state;
    }
  }
});
// Actions
export const { setLoadTestPref, updateLoadTestData, updateLoadGenConfig } =
  loadTestPrefSlice.actions;
// Selectors
export const selectLoadTestPref = (state: MesheryRootState) => state.loadTestPref;
export default loadTestPrefSlice.reducer;
