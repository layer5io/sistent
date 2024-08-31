import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProgressState } from '../../types';

/**
 * Initial state for the progress slice.
 * @type {ProgressState}
 */
const initialState = {
  showProgress: false,
};

/**
 * The progress slice containing a reducer for updating progress state.
 */
const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    /**
     * Updates the progress state.
     * @param {ProgressState} state - Current progress state.
     * @param {PayloadAction<{ showProgress: boolean }>} action - Action containing the new progress state.
     */
    updateProgress: (state, action) => {
      state.showProgress = action.payload.showProgress;
    },
  },
});

/**
 * Exporting action from the progress slice.
 */
export const { updateProgress } = progressSlice.actions;

export default progressSlice;
