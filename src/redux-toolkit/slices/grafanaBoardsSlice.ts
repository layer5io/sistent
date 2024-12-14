import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface GrafanaBoardsState {
  [key: string]: any;
}
// Initial state
const initialState: GrafanaBoardsState = [];
// Slice
const grafanaBoardsSlice = createSlice({
  name: 'grafanaBoards',
  initialState,
  reducers: {
    setGrafanaBoards: (state, action: PayloadAction<GrafanaBoardsState>) => {
      return action.payload;
    },
    updateGrafanaConfig: (state: GrafanaBoardsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    },
    updateStaticBoardConfig: (state: GrafanaBoardsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_STATIC_BOARD_CONFIG
      return state;
    }
  }
});
// Actions
export const { setGrafanaBoards, updateGrafanaConfig, updateStaticBoardConfig } =
  grafanaBoardsSlice.actions;
// Selectors
export const selectGrafanaBoards = (state: MesheryRootState) => state.grafanaBoards;
export default grafanaBoardsSlice.reducer;
