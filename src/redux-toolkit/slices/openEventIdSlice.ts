import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface OpenEventIdState {
  [key: string]: any;
}
// Initial state
const initialState: OpenEventIdState = null;
// Slice
const openEventIdSlice = createSlice({
  name: 'openEventId',
  initialState,
  reducers: {
    setOpenEventId: (state, action: PayloadAction<OpenEventIdState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setOpenEventId } = openEventIdSlice.actions;
// Selectors
export const selectOpenEventId = (state: MesheryRootState) => state.openEventId;
export default openEventIdSlice.reducer;
