import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface LoadTestState {
  testName: string;
  meshName: string;
  url: string;
  qps: number;
  c: number;
  t: string;
  result: {};
}

const initialState: LoadTestState = {
  testName: '',
  meshName: '',
  url: '',
  qps: 0,
  c: 0,
  t: '30s',
  result: {}
};

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

// Thunk action creator
export const updateLoadTest = (payload: LoadTestState) => (dispatch: MesheryReduxAppDispatch) => {
  dispatch(setLoadTest(payload));
};

// Selectors
export const selectLoadTest = (state: MesheryRootState) => state.loadTest;
export default loadTestSlice.reducer;
