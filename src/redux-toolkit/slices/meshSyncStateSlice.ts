import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface MeshSyncStateState {
  [key: string]: any;
}
// Initial state
const initialState: MeshSyncStateState = null;
// Slice
const meshSyncStateSlice = createSlice({
  name: 'meshSyncState',
  initialState,
  reducers: {
    setMeshSyncState: (state, action: PayloadAction<MeshSyncStateState>) => {
      return action.payload;
    },
    setControllerState: (state: MeshSyncStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_CONTROLLER_STATE
      return state;
    },
    setMeshsyncSubscription: (state: MeshSyncStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_MESHSYNC_SUBSCRIPTION
      return state;
    }
  }
});
// Actions
export const { setMeshSyncState, setControllerState, setMeshsyncSubscription } =
  meshSyncStateSlice.actions;
// Selectors
export const selectMeshSyncState = (state: MesheryRootState) => state.meshSyncState;
export default meshSyncStateSlice.reducer;
