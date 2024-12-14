import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface PrometheusURLState {
  [key: string]: any;
}
// Initial state
const initialState: PrometheusURLState = '';
// Slice
const prometheusURLSlice = createSlice({
  name: 'prometheusURL',
  initialState,
  reducers: {
    setPrometheusURL: (state, action: PayloadAction<PrometheusURLState>) => {
      return action.payload;
    },
    updatePrometheusConfig: (state: PrometheusURLState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_PROMETHEUS_CONFIG
      return state;
    }
  }
});
// Actions
export const { setPrometheusURL, updatePrometheusConfig } = prometheusURLSlice.actions;
// Selectors
export const selectPrometheusURL = (state: MesheryRootState) => state.prometheusURL;
export default prometheusURLSlice.reducer;
