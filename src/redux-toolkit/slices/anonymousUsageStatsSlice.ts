import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface AnonymousUsageStatsState {
  value: boolean;
}

const initialState: AnonymousUsageStatsState = { value: false };

const anonymousUsageStatsSlice = createSlice({
  name: 'anonymousUsageStats',
  initialState,
  reducers: {
    setAnonymousUsageStats: (state, action: PayloadAction<AnonymousUsageStatsState>) => {
      return action.payload;
    },
    updateAnonymousUsageStats: (state: AnonymousUsageStatsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_ANONYMOUS_USAGE_STATS
      return state;
    },
    updateAnonymousPerformanceResults: (
      state: AnonymousUsageStatsState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_ANONYMOUS_PERFORMANCE_RESULTS
      return state;
    }
  }
});
// Actions
export const {
  setAnonymousUsageStats,
  // updateAnonymousUsageStats,
  updateAnonymousPerformanceResults
} = anonymousUsageStatsSlice.actions;

// Thunk action creator
export const updateAnonymousUsageStats =
  (payload: AnonymousUsageStatsState) => (dispatch: MesheryReduxAppDispatch) => {
    dispatch(setAnonymousUsageStats(payload));
  };

// Selectors
export const selectAnonymousUsageStats = (state: MesheryRootState) => state.anonymousUsageStats;
export default anonymousUsageStatsSlice.reducer;
