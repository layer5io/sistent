import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface NotificationCenterState {
  [key: string]: any;
}
// Initial state
const initialState: NotificationCenterState = {
  openEventId: null,
  showFullNotificationCenter: false
};
// Slice
const notificationCenterSlice = createSlice({
  name: 'notificationCenter',
  initialState,
  reducers: {
    setNotificationCenter: (state, action: PayloadAction<NotificationCenterState>) => {
      return action.payload;
    }
  }
});
// Actions
export const { setNotificationCenter } = notificationCenterSlice.actions;
// Selectors
export const selectNotificationCenter = (state: MesheryRootState) => state.notificationCenter;
export default notificationCenterSlice.reducer;
