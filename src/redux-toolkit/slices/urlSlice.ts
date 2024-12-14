import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface UrlState {
  [key: string]: any;
}
// Initial state
const initialState: UrlState = '';
// Slice
const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<UrlState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setUrl } = urlSlice.actions;
// Selectors
export const selectUrl = (state: MesheryRootState) => state.url;
export default urlSlice.reducer;
