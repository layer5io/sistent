import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface StaticPrometheusBoardConfigState {}

const initialState: StaticPrometheusBoardConfigState = {};

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

// Thunk action creator
export const updateStaticPrometheusBoardConfig =
  (payload: StaticPrometheusBoardConfigState) => (dispatch: MesheryReduxAppDispatch) => {
    dispatch(setStaticPrometheusBoardConfig(payload));
  };

// Selectors
export const selectStaticPrometheusBoardConfig = (state: MesheryRootState) =>
  state.staticPrometheusBoardConfig;
export default staticPrometheusBoardConfigSlice.reducer;
