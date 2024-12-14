import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface PrometheusState {
  [key: string]: any;
}
// Initial state
const initialState: PrometheusState = [];
// Slice
const prometheusSlice = createSlice({
  name: 'prometheus',
  initialState,
  reducers: {
    setPrometheus: (state, action: PayloadAction<PrometheusState>) => {
      return action.payload;
    },
    updatePrometheusConfig: (state: PrometheusState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_PROMETHEUS_CONFIG
      return state;
    }
  }
});
// Actions
export const { setPrometheus, updatePrometheusConfig } = prometheusSlice.actions;
// Selectors
export const selectPrometheus = (state: MesheryRootState) => state.prometheus;
export default prometheusSlice.reducer;
