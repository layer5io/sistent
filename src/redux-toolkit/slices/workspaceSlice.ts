import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface WorkspaceState {
  value: any;
}

const initialState: WorkspaceState = { value: null };

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspace: (state, action: PayloadAction<WorkspaceState>) => {
      return action.payload;
    }
    /*
    setWorkspace: (state: WorkspaceState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_WORKSPACE
      return state;
    }
    */
  }
});

export const { setWorkspace } = workspaceSlice.actions;

// Thunk action creator
export const updateWorkspace = (payload: WorkspaceState) => (dispatch: MesheryReduxAppDispatch) => {
  dispatch(setWorkspace(payload));
};

// Selectors
export const selectWorkspace = (state: MesheryRootState) => state.workspace;
export default workspaceSlice.reducer;
