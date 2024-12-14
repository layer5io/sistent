import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface SelectedBoardsConfigsState {
  [key: string]: any;
}
// Initial state
const initialState: SelectedBoardsConfigsState = [];
// Slice
const selectedBoardsConfigsSlice = createSlice({
  name: 'selectedBoardsConfigs',
  initialState,
  reducers: {
    setSelectedBoardsConfigs: (state, action: PayloadAction<SelectedBoardsConfigsState>) => {
      return action.payload;
    },
    updateClusterConfig: (state: SelectedBoardsConfigsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_CLUSTER_CONFIG
      return state;
    },
    updateGrafanaConfig: (state: SelectedBoardsConfigsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    },
    updatePrometheusConfig: (state: SelectedBoardsConfigsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_PROMETHEUS_CONFIG
      return state;
    },
    updateStaticBoardConfig: (state: SelectedBoardsConfigsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_STATIC_BOARD_CONFIG
      return state;
    },
    updateLoadGenConfig: (state: SelectedBoardsConfigsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_GEN_CONFIG
      return state;
    }
  }
});
// Actions
export const {
  setSelectedBoardsConfigs,
  updateClusterConfig,
  updateGrafanaConfig,
  updatePrometheusConfig,
  updateStaticBoardConfig,
  updateLoadGenConfig
} = selectedBoardsConfigsSlice.actions;
// Selectors
export const selectSelectedBoardsConfigs = (state: MesheryRootState) => state.selectedBoardsConfigs;
export default selectedBoardsConfigsSlice.reducer;
