import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface GrafanaState {
  [key: string]: any;
}

const initialState: GrafanaState = [];

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

// Thunk action creator
export const updateGrafana = (payload: GrafanaState) => (dispatch: MesheryReduxAppDispatch) => {
  dispatch(setGrafana(payload));
};

// Selectors
export const selectGrafana = (state: MesheryRootState) => state.grafana;
export default grafanaSlice.reducer;
