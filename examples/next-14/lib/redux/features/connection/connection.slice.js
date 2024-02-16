import { createSlice } from '@reduxjs/toolkit';
import { ConnectionState } from '../../types';

/**
 * Initial state for the connection slice.
 * @type {ConnectionState}
 */
const initialState = {
  connectionMetadataState: null,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    setConnectionMetadata: (state, action) => {
      state.connectionMetadataState = action.payload.connectionMetadataState;
    },
  },
});

export const { setConnectionMetadata } = connectionSlice.actions;

export default connectionSlice;
