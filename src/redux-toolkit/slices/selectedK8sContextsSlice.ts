import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface SelectedK8sContextsState {
  [key: string]: any;
}

const initialState: SelectedK8sContextsState = ['all'];
// Slice
const selectedK8sContextsSlice = createSlice({
  name: 'selectedK8sContexts',
  initialState,
  reducers: {
    setSelectedK8sContexts: (state, action: PayloadAction<SelectedK8sContextsState>) => {
      return action.payload;
    },
    setK8sContext: (state: SelectedK8sContextsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_K8S_CONTEXT
      return state;
    }
  }
});

export const { setSelectedK8sContexts, setK8sContext } = selectedK8sContextsSlice.actions;

// Selectors
export const selectSelectedK8sContexts = (state: MesheryRootState) => state.selectedK8sContexts;
export default selectedK8sContextsSlice.reducer;
