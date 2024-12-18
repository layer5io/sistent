import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface TestNameState {
  [key: string]: any;
}
// Initial state
const initialState: TestNameState = '';
// Slice
const testNameSlice = createSlice({
  name: 'testName',
  initialState,
  reducers: {
    setTestName: (state, action: PayloadAction<TestNameState>) => {
      return action.payload;
    },
    updateLoadTestData: (state: TestNameState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_TEST_DATA
      return state;
    }
  }
});
// Actions
export const { setTestName, updateLoadTestData } = testNameSlice.actions;
// Selectors
export const selectTestName = (state: MesheryRootState) => state.testName;
export default testNameSlice.reducer;
