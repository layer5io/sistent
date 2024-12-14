import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface SelectedPrometheusBoardsConfigsState {
  [key: string]: any;
}

const initialState: SelectedPrometheusBoardsConfigsState = [];

const selectedPrometheusBoardsConfigsSlice = createSlice({
  name: 'selectedPrometheusBoardsConfigs',
  initialState,
  reducers: {
    setSelectedPrometheusBoardsConfigs: (
      state,
      action: PayloadAction<SelectedPrometheusBoardsConfigsState>
    ) => {
      return action.payload;
    },
    updateClusterConfig: (
      state: SelectedPrometheusBoardsConfigsState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_CLUSTER_CONFIG
      return state;
    },
    updateGrafanaConfig: (
      state: SelectedPrometheusBoardsConfigsState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    },
    updatePrometheusConfig: (
      state: SelectedPrometheusBoardsConfigsState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_PROMETHEUS_CONFIG
      return state;
    },
    updateStaticBoardConfig: (
      state: SelectedPrometheusBoardsConfigsState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_STATIC_BOARD_CONFIG
      return state;
    },
    updateLoadGenConfig: (
      state: SelectedPrometheusBoardsConfigsState,
      action: PayloadAction<any>
    ) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_GEN_CONFIG
      return state;
    }
  }
});

export const {
  setSelectedPrometheusBoardsConfigs,
  updateClusterConfig,
  updateGrafanaConfig,
  updatePrometheusConfig,
  updateStaticBoardConfig,
  updateLoadGenConfig
} = selectedPrometheusBoardsConfigsSlice.actions;

// Selectors
export const selectSelectedPrometheusBoardsConfigs = (state: MesheryRootState) =>
  state.selectedPrometheusBoardsConfigs;
export default selectedPrometheusBoardsConfigsSlice.reducer;
