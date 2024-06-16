import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NavigatorState } from '../../types';

/**
 * Initial state for the navigator slice.
 * @type {NavigatorState}
 */
const initialState = {
  isOpen: false,
};

/**
 * The navigator slice containing reducers for toggling and setting drawer state.
 */
const navSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    /**
     * Toggles the drawer state.
     * @param {NavigatorState} state - Current navigator state.
     */
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    /**
     * Sets the drawer state.
     * @param {NavigatorState} state - Current navigator state.
     * @param {PayloadAction<boolean>} action - Action containing the new drawer state.
     */
    setDrawerOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

/**
 * Exporting actions from the navigator slice.
 */
export const { toggleDrawer, setDrawerOpen } = navSlice.actions;

export default navSlice;
