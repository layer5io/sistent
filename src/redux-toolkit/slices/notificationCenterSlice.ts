import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface NotificationCenterState {
  openEventId: any;
  showFullNotificationCenter: boolean;
}

const initialState: NotificationCenterState = {
  openEventId: null,
  showFullNotificationCenter: false
};

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

// Thunk action creator
export const updateNotificationCenter =
  (payload: NotificationCenterState) => (dispatch: MesheryReduxAppDispatch) => {
    dispatch(setNotificationCenter(payload));
  };

// Selectors
export const selectNotificationCenter = (state: MesheryRootState) => state.notificationCenter;
export default notificationCenterSlice.reducer;
