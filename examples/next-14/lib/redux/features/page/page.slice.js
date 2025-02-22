import { createSlice } from '@reduxjs/toolkit';
import { PageState } from '../../types';

/**
 * Initial state for the page slice.
 * @type {PageState}
 */
const initialState = {
  path: '',
  title: '',
  isBeta: false,
};

/**
 * The page slice containing reducers for updating page information.
 */
const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    /**
     * Updates the page path.
     * @param {PageState} state - Current page state.
     * @param {PayloadAction<string>} action - Action containing the new path.
     */
    updatePagePath: (state, action) => {
      state.path = action.payload;
    },
    /**
     * Updates the page title.
     * @param {PageState} state - Current page state.
     * @param {PayloadAction<string>} action - Action containing the new title.
     */
    updatePathTitle: (state, action) => {
      state.title = action.payload;
    },
    /**
     * Updates the badge status of the page.
     * @param {PageState} state - Current page state.
     * @param {PayloadAction<boolean>} action - Action containing the new badge status.
     */
    updateBadgeStatus: (state, action) => {
      state.isBeta = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePathTitle, (state, action) => {
      state.path = action.payload.path;
      state.title = action.payload.title;
    });
  },
});

/**
 * Exporting actions from the page slice.
 */
export const { updatePagePath, updatePathTitle, updateBadgeStatus } = pageSlice.actions;

export default pageSlice;
