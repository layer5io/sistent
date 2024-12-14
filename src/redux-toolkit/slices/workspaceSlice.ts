import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface WorkspaceState {
  [key: string]: any;
}

const initialState: WorkspaceState = null;

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    /*
        setWorkspace: (state, action: PayloadAction<WorkspaceState>) => {
            return action.payload;
        },
        */
    setWorkspace: (state: WorkspaceState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_WORKSPACE
      return state;
    }
  }
});

export const { setWorkspace } = workspaceSlice.actions;

// Selectors
export const selectWorkspace = (state: MesheryRootState) => state.workspace;
export default workspaceSlice.reducer;
