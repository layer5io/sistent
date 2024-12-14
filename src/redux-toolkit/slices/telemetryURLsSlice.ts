import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface TelemetryURLsState {
  [key: string]: any;
}
// Initial state
const initialState: TelemetryURLsState = {
  grafana: [],
  prometheus: []
};
// Slice
const telemetryURLsSlice = createSlice({
  name: 'telemetryURLs',
  initialState,
  reducers: {
    setTelemetryURLs: (state, action: PayloadAction<TelemetryURLsState>) => {
      return action.payload;
    },
    updateTelemetryUrls: (state: TelemetryURLsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_TELEMETRY_URLS
      return state;
    }
  }
});
// Actions
export const { setTelemetryURLs, updateTelemetryUrls } = telemetryURLsSlice.actions;
// Selectors
export const selectTelemetryURLs = (state: MesheryRootState) => state.telemetryURLs;
export default telemetryURLsSlice.reducer;
