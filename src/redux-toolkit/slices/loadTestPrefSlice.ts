import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface LoadTestPrefState {
  [key: string]: any;
}

const initialState: LoadTestPrefState = {
  qps: 0,
  t: '30s',
  c: 0,
  gen: 'fortio',
  ts: new Date()
};

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

// Thunk action creator
export const updateLoadTestPref =
  (payload: LoadTestPrefState) => (dispatch: MesheryReduxAppDispatch) => {
    dispatch(setLoadTestPref(payload));
  };

// Selectors
export const selectLoadTestPref = (state: MesheryRootState) => state.loadTestPref;
export default loadTestPrefSlice.reducer;
