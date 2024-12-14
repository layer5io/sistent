import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface AnonymousPerfResultsState {
  [key: string]: any;
}
// Initial state
const initialState: AnonymousPerfResultsState = true;
// Slice
const anonymousPerfResultsSlice = createSlice({
  name: 'anonymousPerfResults',
  initialState,
  reducers: {
    setAnonymousPerfResults: (state, action: PayloadAction<AnonymousPerfResultsState>) => {
      return action.payload;
    },
    updateResultsSelection: (state: AnonymousPerfResultsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_RESULTS_SELECTION
      return state;
    },
    clearResultsSelection: (state: AnonymousPerfResultsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for CLEAR_RESULTS_SELECTION
      return state;
    },
    updateAnonymousUsageStats: (state: AnonymousPerfResultsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_ANONYMOUS_USAGE_STATS
      return state;
    },
    updateAnonymousPerformanceResults: (
      state: AnonymousPerfResultsState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_ANONYMOUS_PERFORMANCE_RESULTS
      return state;
    }
  }
});
// Actions
export const {
  setAnonymousPerfResults,
  updateResultsSelection,
  clearResultsSelection,
  updateAnonymousUsageStats,
  updateAnonymousPerformanceResults
} = anonymousPerfResultsSlice.actions;
// Selectors
export const selectAnonymousPerfResults = (state: MesheryRootState) => state.anonymousPerfResults;
export default anonymousPerfResultsSlice.reducer;
