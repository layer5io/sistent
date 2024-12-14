import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface GrafanaURLState {
  [key: string]: any;
}
// Initial state
const initialState: GrafanaURLState = '';
// Slice
const grafanaURLSlice = createSlice({
  name: 'grafanaURL',
  initialState,
  reducers: {
    setGrafanaURL: (state, action: PayloadAction<GrafanaURLState>) => {
      return action.payload;
    },
    updateGrafanaConfig: (state: GrafanaURLState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    }
  }
});
// Actions
export const { setGrafanaURL, updateGrafanaConfig } = grafanaURLSlice.actions;
// Selectors
export const selectGrafanaURL = (state: MesheryRootState) => state.grafanaURL;
export default grafanaURLSlice.reducer;
