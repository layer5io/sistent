import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface GrafanaState {
  [key: string]: any;
}
// Initial state
const initialState: GrafanaState = [];
// Slice
const grafanaSlice = createSlice({
  name: 'grafana',
  initialState,
  reducers: {
    setGrafana: (state, action: PayloadAction<GrafanaState>) => {
      return action.payload;
    },
    updateGrafanaConfig: (state: GrafanaState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    }
  }
});
// Actions
export const { setGrafana, updateGrafanaConfig } = grafanaSlice.actions;
// Selectors
export const selectGrafana = (state: MesheryRootState) => state.grafana;
export default grafanaSlice.reducer;
