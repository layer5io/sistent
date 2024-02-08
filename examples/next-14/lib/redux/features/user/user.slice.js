import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../types';

/**
 * Initial state for the users slice.
 * @type {UserState}
 */
const initialState = {
  user: {},
  loading: false,
  error: '',
};

/**
 * The users slice containing reducers for updating user information.
 */
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    /**
     * Sets loading to true and clears error when updating user.
     * @param {UserState} state - Current user state.
     */
    updateUser: (state) => {
      state.loading = true;
      state.error = '';
    },
    /**
     * Updates user information on successful update.
     * @param {UserState} state - Current user state.
     * @param {PayloadAction<UserState>} action - Action containing the updated user state.
     */
    updateUserSuccess: (state, action) => {
      state.user = action.payload.user;
      state.loading = false;
      state.error = '';
    },
    /**
     * Updates error on failed user update.
     * @param {UserState} state - Current user state.
     * @param {PayloadAction<UserState>} action - Action containing the updated user state.
     */
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

/**
 * Exporting actions from the users slice.
 */
export const { updateUser, updateUserSuccess, updateUserFailure } = usersSlice.actions;

export default usersSlice;
