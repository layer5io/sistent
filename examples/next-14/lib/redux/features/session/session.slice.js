import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SessionState } from '../../types';

/**
 * Initial state for the session slice.
 * @type {SessionState}
 */
const initialState = {
  countdown: 3,
  sessionData: null,
};

/**
 * Thunk action creator for fetching session data asynchronously.
 * @type {import("@reduxjs/toolkit").AsyncThunk<*, *, {}>}
 */
export const fetchSessionData = createAsyncThunk(
  'session/fetchSessionData',
  /**
   * Async function to fetch session data.
   * @param {*} _ - The payload (not used in this case).
   * @param {Object} thunkAPI - The Redux toolkit `thunkAPI` object.
   * @returns {Promise<SessionData>} A promise resolving to the session data.
   */
  async (_, { getState }) => {
    // Access the session data from the Redux store state
    const { session } = getState();

    // If the session data is already available in the Redux store, return it
    if (session.sessionData) {
      return session.sessionData;
    }

    // If the session data is not available, you might need to handle it differently
    // For example, you can throw an error or return a default value

    // Throw an error if session data is not available
    throw new Error('Session data not available');
  },
);

/**
 * Slice for managing session-related state.
 * @type {import("@reduxjs/toolkit").Slice<SessionState, {}, string>}
 */
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSessionData.fulfilled, (state, action) => {
      state.sessionData = action.payload;
    });
  },
});

export default sessionSlice;
