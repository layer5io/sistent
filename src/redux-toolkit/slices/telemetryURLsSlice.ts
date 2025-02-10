import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface TelemetryURLsState {
  grafana: any[];
  prometheus: any[];
}

const initialState: TelemetryURLsState = {
  grafana: [],
  prometheus: []
};

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

// Thunk action creator
export const updateTelemetryURLs =
  (payload: TelemetryURLsState) => (dispatch: MesheryReduxAppDispatch) => {
    dispatch(setTelemetryURLs(payload));
  };

// Selectors
export const selectTelemetryURLs = (state: MesheryRootState) => state.telemetryURLs;
export default telemetryURLsSlice.reducer;
