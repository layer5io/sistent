import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface MeshAdaptersState {
  items: any[];
}

const initialState: MeshAdaptersState = { items: [] };

const meshAdaptersSlice = createSlice({
  name: 'meshAdapters',
  initialState,
  reducers: {
    setMeshAdapters: (state, action: PayloadAction<MeshAdaptersState>) => {
      return action.payload;
    },
    updateAdaptersInfo: (state: MeshAdaptersState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_ADAPTERS_INFO
      return state;
    },
    setAdapter: (state: MeshAdaptersState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_ADAPTER
      return state;
    }
  }
});

// Actions
export const { setMeshAdapters, updateAdaptersInfo, setAdapter } = meshAdaptersSlice.actions;

// Selectors
export const selectMeshAdapters = (state: MesheryRootState) => state.meshAdapters;
export default meshAdaptersSlice.reducer;
