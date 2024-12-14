import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface K8sConfigState {
  [key: string]: any;
}

const initialState: K8sConfigState = [];

const k8sConfigSlice = createSlice({
  name: 'k8sConfig',
  initialState,
  reducers: {
    setK8sConfig: (state, action: PayloadAction<K8sConfigState>) => {
      return action.payload;
    },
    updateClusterConfig: (state: K8sConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_CLUSTER_CONFIG
      return state;
    },
    setK8sContext: (state: K8sConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_K8S_CONTEXT
      return state;
    },
    updateGrafanaConfig: (state: K8sConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    },
    updatePrometheusConfig: (state: K8sConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_PROMETHEUS_CONFIG
      return state;
    },
    updateStaticBoardConfig: (state: K8sConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_STATIC_BOARD_CONFIG
      return state;
    },
    updateLoadGenConfig: (state: K8sConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_GEN_CONFIG
      return state;
    }
  }
});

export const {
  setK8sConfig,
  updateClusterConfig,
  setK8sContext,
  updateGrafanaConfig,
  updatePrometheusConfig,
  updateStaticBoardConfig,
  updateLoadGenConfig
} = k8sConfigSlice.actions;

// Selectors
export const selectK8sConfig = (state: MesheryRootState) => state.k8sConfig;
export default k8sConfigSlice.reducer;
