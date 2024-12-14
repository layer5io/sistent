import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface UserState {
  [key: string]: any;
}

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

export const { setUser, updateUser } = userSlice.actions;

// Selectors
export const selectUser = (state: MesheryRootState) => state.user;
export default userSlice.reducer;
