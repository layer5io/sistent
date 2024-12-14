import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface StaticPrometheusBoardConfigState {
  [key: string]: any;
}
// Initial state
const initialState: StaticPrometheusBoardConfigState = {};
// Slice
const staticPrometheusBoardConfigSlice = createSlice({
  name: 'staticPrometheusBoardConfig',
  initialState,
  reducers: {
    setStaticPrometheusBoardConfig: (
      state,
      action: PayloadAction<StaticPrometheusBoardConfigState>
    ) => {
      return action.payload;
    },
    updateClusterConfig: (state: StaticPrometheusBoardConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_CLUSTER_CONFIG
      return state;
    },
    updateGrafanaConfig: (state: StaticPrometheusBoardConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    },
    updatePrometheusConfig: (
      state: StaticPrometheusBoardConfigState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_PROMETHEUS_CONFIG
      return state;
    },
    updateStaticBoardConfig: (
      state: StaticPrometheusBoardConfigState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_STATIC_BOARD_CONFIG
      return state;
    },
    updateLoadGenConfig: (state: StaticPrometheusBoardConfigState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_GEN_CONFIG
      return state;
    }
  }
});
// Actions
export const {
  setStaticPrometheusBoardConfig,
  updateClusterConfig,
  updateGrafanaConfig,
  updatePrometheusConfig,
  updateStaticBoardConfig,
  updateLoadGenConfig
} = staticPrometheusBoardConfigSlice.actions;
// Selectors
export const selectStaticPrometheusBoardConfig = (state: MesheryRootState) =>
  state.staticPrometheusBoardConfig;
export default staticPrometheusBoardConfigSlice.reducer;
