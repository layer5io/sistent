import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface MeshNameState {
  [key: string]: any;
}
// Initial state
const initialState: MeshNameState = '';
// Slice
const meshNameSlice = createSlice({
  name: 'meshName',
  initialState,
  reducers: {
    setMeshName: (state, action: PayloadAction<MeshNameState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setMeshName } = meshNameSlice.actions;
// Selectors
export const selectMeshName = (state: MesheryRootState) => state.meshName;
export default meshNameSlice.reducer;
