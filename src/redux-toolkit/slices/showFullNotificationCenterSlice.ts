import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface ShowFullNotificationCenterState {
  [key: string]: any;
}
// Initial state
const initialState: ShowFullNotificationCenterState = false;
// Slice
const showFullNotificationCenterSlice = createSlice({
  name: 'showFullNotificationCenter',
  initialState,
  reducers: {
    setShowFullNotificationCenter: (
      state,
      action: PayloadAction<ShowFullNotificationCenterState>
    ) => {
      return action.payload;
    }
  }
});
// Actions
export const { setShowFullNotificationCenter } = showFullNotificationCenterSlice.actions;
// Selectors
export const selectShowFullNotificationCenter = (state: MesheryRootState) =>
  state.showFullNotificationCenter;
export default showFullNotificationCenterSlice.reducer;
