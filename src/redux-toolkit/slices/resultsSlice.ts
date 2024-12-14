import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface ResultsState {
  [key: string]: any;
}
// Initial state
const initialState: ResultsState = [];
// Slice
const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<ResultsState>) => {
      return action.payload;
    },
    updateResultsSelection: (state: ResultsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_RESULTS_SELECTION
      return state;
    },
    clearResultsSelection: (state: ResultsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for CLEAR_RESULTS_SELECTION
      return state;
    },
    updateAnonymousPerformanceResults: (state: ResultsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_ANONYMOUS_PERFORMANCE_RESULTS
      return state;
    }
  }
});
// Actions
export const {
  setResults,
  updateResultsSelection,
  clearResultsSelection,
  updateAnonymousPerformanceResults
} = resultsSlice.actions;
// Selectors
export const selectResults = (state: MesheryRootState) => state.results;
export default resultsSlice.reducer;
