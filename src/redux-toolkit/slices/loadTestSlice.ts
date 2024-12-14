import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface LoadTestState {
  [key: string]: any;
}
// Initial state
const initialState: LoadTestState = {
  testName: '',
  meshName: '',
  url: '',
  qps: 0,
  c: 0,
  t: '30s',
  result: {}
};
// Slice
const loadTestSlice = createSlice({
  name: 'loadTest',
  initialState,
  reducers: {
    setLoadTest: (state, action: PayloadAction<LoadTestState>) => {
      return action.payload;
    },
    updateLoadTestData: (state: LoadTestState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_TEST_DATA
      return state;
    },
    updateLoadGenConfig: (state: LoadTestState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_GEN_CONFIG
      return state;
    }
  }
});
// Actions
export const { setLoadTest, updateLoadTestData, updateLoadGenConfig } = loadTestSlice.actions;
// Selectors
export const selectLoadTest = (state: MesheryRootState) => state.loadTest;
export default loadTestSlice.reducer;
