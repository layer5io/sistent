import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface AnonymousUsageStatsState {
  [key: string]: any;
}
// Initial state
const initialState: AnonymousUsageStatsState = true;
// Slice
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
  updateAnonymousUsageStats,
  updateAnonymousPerformanceResults
} = anonymousUsageStatsSlice.actions;
// Selectors
export const selectAnonymousUsageStats = (state: MesheryRootState) => state.anonymousUsageStats;
export default anonymousUsageStatsSlice.reducer;
