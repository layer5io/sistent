import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface SelectedAdapterState {
  [key: string]: any;
}
// Initial state
const initialState: SelectedAdapterState = '';
// Slice
const selectedAdapterSlice = createSlice({
  name: 'selectedAdapter',
  initialState,
  reducers: {
    setSelectedAdapter: (state, action: PayloadAction<SelectedAdapterState>) => {
      return action.payload;
    },
    setAdapter: (state: SelectedAdapterState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_ADAPTER
      return state;
    }
  }
});
// Actions
export const { setSelectedAdapter, setAdapter } = selectedAdapterSlice.actions;
// Selectors
export const selectSelectedAdapter = (state: MesheryRootState) => state.selectedAdapter;
export default selectedAdapterSlice.reducer;
