import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface GrafanaAPIKeyState {
  [key: string]: any;
}
// Initial state
const initialState: GrafanaAPIKeyState = '';
// Slice
const grafanaAPIKeySlice = createSlice({
  name: 'grafanaAPIKey',
  initialState,
  reducers: {
    setGrafanaAPIKey: (state, action: PayloadAction<GrafanaAPIKeyState>) => {
      return action.payload;
    },
    updateGrafanaConfig: (state: GrafanaAPIKeyState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    }
  }
});
// Actions
export const { setGrafanaAPIKey, updateGrafanaConfig } = grafanaAPIKeySlice.actions;
// Selectors
export const selectGrafanaAPIKey = (state: MesheryRootState) => state.grafanaAPIKey;
export default grafanaAPIKeySlice.reducer;
