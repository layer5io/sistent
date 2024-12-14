import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface IsDrawerCollapsedState {
  [key: string]: any;
}
// Initial state
const initialState: IsDrawerCollapsedState = false;
// Slice
const isDrawerCollapsedSlice = createSlice({
  name: 'isDrawerCollapsed',
  initialState,
  reducers: {
    setIsDrawerCollapsed: (state, action: PayloadAction<IsDrawerCollapsedState>) => {
      return action.payload;
    },
    toogleDrawer: (state: IsDrawerCollapsedState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for TOOGLE_DRAWER
      return state;
    }
  }
});
// Actions
export const { setIsDrawerCollapsed, toogleDrawer } = isDrawerCollapsedSlice.actions;
// Selectors
export const selectIsDrawerCollapsed = (state: MesheryRootState) => state.isDrawerCollapsed;
export default isDrawerCollapsedSlice.reducer;
