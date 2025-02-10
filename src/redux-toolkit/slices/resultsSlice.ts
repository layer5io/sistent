import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface ResultsState {
  startKey: string;
  results: any[];
}

const initialState: ResultsState = {
  startKey: '',
  results: []
};

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

// Thunk action creator
export const updateResults = (payload: ResultsState) => (dispatch: MesheryReduxAppDispatch) => {
  dispatch(setResults(payload));
};

// Selectors
export const selectResults = (state: MesheryRootState) => state.results;
export default resultsSlice.reducer;
