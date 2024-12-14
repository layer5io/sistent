import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface GrafanaBoardSearchState {
  [key: string]: any;
}
// Initial state
const initialState: GrafanaBoardSearchState = '';
// Slice
const grafanaBoardSearchSlice = createSlice({
  name: 'grafanaBoardSearch',
  initialState,
  reducers: {
    setGrafanaBoardSearch: (state, action: PayloadAction<GrafanaBoardSearchState>) => {
      return action.payload;
    },
    updateGrafanaConfig: (state: GrafanaBoardSearchState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_GRAFANA_CONFIG
      return state;
    },
    updateStaticBoardConfig: (state: GrafanaBoardSearchState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_STATIC_BOARD_CONFIG
      return state;
    }
  }
});
// Actions
export const { setGrafanaBoardSearch, updateGrafanaConfig, updateStaticBoardConfig } =
  grafanaBoardSearchSlice.actions;
// Selectors
export const selectGrafanaBoardSearch = (state: MesheryRootState) => state.grafanaBoardSearch;
export default grafanaBoardSearchSlice.reducer;
