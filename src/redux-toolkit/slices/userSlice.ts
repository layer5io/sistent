import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface UserState {}

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    updateUser: (state: UserState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_USER
      return state;
    }
  }
});

export const { setUser } = userSlice.actions;

// Thunk action creator
export const updateUser = (payload: UserState) => (dispatch: MesheryReduxAppDispatch) => {
  dispatch(setUser(payload));
};

// Selectors
export const selectUser = (state: MesheryRootState) => state.user;
export default userSlice.reducer;
