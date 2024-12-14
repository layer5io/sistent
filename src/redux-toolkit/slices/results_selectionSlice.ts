import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface Results_selectionState {
  [key: string]: any;
}
// Initial state
const initialState: Results_selectionState = {};
// Slice
const results_selectionSlice = createSlice({
  name: 'results_selection',
  initialState,
  reducers: {
    setResults_selection: (state, action: PayloadAction<Results_selectionState>) => {
      return action.payload;
    },
    updateResultsSelection: (state: Results_selectionState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_RESULTS_SELECTION
      return state;
    },
    clearResultsSelection: (state: Results_selectionState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for CLEAR_RESULTS_SELECTION
      return state;
    },
    updateAnonymousPerformanceResults: (
      state: Results_selectionState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_ANONYMOUS_PERFORMANCE_RESULTS
      return state;
    }
  }
});
// Actions
export const {
  setResults_selection,
  updateResultsSelection,
  clearResultsSelection,
  updateAnonymousPerformanceResults
} = results_selectionSlice.actions;
// Selectors
export const selectResults_selection = (state: MesheryRootState) => state.results_selection;
export default results_selectionSlice.reducer;
