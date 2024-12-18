import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface PrometheusState {
  prometheusURL: string;
  selectedPrometheusBoardsConfigs: any[];
  ts: Date;
}

const initialState: PrometheusState = {
  prometheusURL: '',
  selectedPrometheusBoardsConfigs: [],
  ts: new Date()
};

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

// Thunk action creator
export const updatePrometheus =
  (payload: PrometheusState) => (dispatch: MesheryReduxAppDispatch) => {
    dispatch(setPrometheus(payload));
  };

// Selectors
export const selectPrometheus = (state: MesheryRootState) => state.prometheus;
export default prometheusSlice.reducer;
