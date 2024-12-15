import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
export interface CatalogVisibilityState {
  value: boolean;
}

const initialState: CatalogVisibilityState = { value: false };

const catalogVisibilitySlice = createSlice({
  name: 'catalogVisibility',
  initialState,
  reducers: {
    setCatalogVisibility: (state, action: PayloadAction<CatalogVisibilityState>) => {
      return action.payload;
    },
    setCatalogContent: (state: CatalogVisibilityState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_CATALOG_CONTENT
      return state;
    }
  }
});

// Actions
export const { setCatalogVisibility, setCatalogContent } = catalogVisibilitySlice.actions;

// Selectors
export const selectCatalogVisibility = (state: MesheryRootState) => state.catalogVisibility;
export default catalogVisibilitySlice.reducer;
