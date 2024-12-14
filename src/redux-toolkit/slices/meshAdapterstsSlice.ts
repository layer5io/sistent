import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface MeshAdapterstsState {
  [key: string]: any;
}
// Initial state
const initialState: MeshAdapterstsState = new Date();
// Slice
const meshAdapterstsSlice = createSlice({
  name: 'meshAdaptersts',
  initialState,
  reducers: {
    setMeshAdaptersts: (state, action: PayloadAction<MeshAdapterstsState>) => {
      return action.payload;
    },
    updateAdaptersInfo: (state: MeshAdapterstsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_ADAPTERS_INFO
      return state;
    },
    setAdapter: (state: MeshAdapterstsState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_ADAPTER
      return state;
    }
  }
});
// Actions
export const { setMeshAdaptersts, updateAdaptersInfo, setAdapter } = meshAdapterstsSlice.actions;
// Selectors
export const selectMeshAdaptersts = (state: MesheryRootState) => state.meshAdaptersts;
export default meshAdapterstsSlice.reducer;
