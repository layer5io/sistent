import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the async thunk for fetching contexts
export const fetchContextsAsync = createAsyncThunk(
  'contexts/fetchContexts',
  async (params, { rejectWithValue }) => {
    try {
      const { number = 10, search = '' } = params;
      const response = await promisifiedDataFetch(
        `/api/system/kubernetes/contexts?pagesize=${number}&search=${encodeURIComponent(search)}`,
      );
      return response;
    } catch (error) {
      // Handle errors and provide additional information if needed
      return rejectWithValue(error.message || 'Failed to fetch contexts');
    }
  },
);

// Define the initial state
const initialState = {
  contexts: [],
  status: 'idle',
  error: null,
};

// Create a slice
const contextsSlice = createSlice({
  name: 'contexts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContextsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContextsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contexts = action.payload;
      })
      .addCase(fetchContextsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default contextsSlice;
