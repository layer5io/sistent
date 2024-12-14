import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface ConnectionMetadataStateState {
  [key: string]: any;
}
// Initial state
const initialState: ConnectionMetadataStateState = null;
// Slice
const connectionMetadataStateSlice = createSlice({
  name: 'connectionMetadataState',
  initialState,
  reducers: {
    setConnectionMetadataState: (state, action: PayloadAction<ConnectionMetadataStateState>) => {
      return action.payload;
    },
    updateLoadTestData: (state: ConnectionMetadataStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_LOAD_TEST_DATA
      return state;
    },
    setControllerState: (state: ConnectionMetadataStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_CONTROLLER_STATE
      return state;
    },
    setConnectionMetadata: (state: ConnectionMetadataStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_CONNECTION_METADATA
      return state;
    }
  }
});
// Actions
export const {
  setConnectionMetadataState,
  updateLoadTestData,
  setControllerState,
  setConnectionMetadata
} = connectionMetadataStateSlice.actions;
// Selectors
export const selectConnectionMetadataState = (state: MesheryRootState) =>
  state.connectionMetadataState;
export default connectionMetadataStateSlice.reducer;
