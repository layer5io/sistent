import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProvidersState } from '../../types';

/**
 * Async thunk to fetch providers data.
 * @param {void} _ - No parameters needed.
 * @param {object} thunkAPI - The Redux Thunk API.
 * @returns {Promise<Record<string, any>>} - A promise resolving to the fetched providers data.
 */
export const fetchProviders = createAsyncThunk('providers/fetchProviders', async (_, thunkAPI) => {
  try {
    const response = await fetch('http://localhost:9081/api/providers', {
      method: 'GET',
      credentials: 'include',
    });

    // Log the response here
    console.log('Response:', response);

    if (!response.ok) {
      // Handle non-OK responses
      const errorText = await response.text();
      return thunkAPI.rejectWithValue(errorText);
    }

    const result = await response.json();

    // Log the result here
    console.log('Result:', result);

    // Assuming the structure you want is nested under the "Meshery" key
    const mesheryData = result['Meshery'];

    if (!mesheryData) {
      // Handle the case where the structure is not found
      return thunkAPI.rejectWithValue('Meshery data not found');
    }

    // Assuming you also want information from the "None" key
    const noneData = result['None'];

    if (!noneData) {
      // Handle the case where the structure is not found
      return thunkAPI.rejectWithValue('None data not found');
    }

    // Extract capabilities from Meshery
    const mesheryCapabilities = extractCapabilities(mesheryData);

    // Extract capabilities from None
    const noneCapabilities = extractCapabilities(noneData);

    // You can now use mesheryCapabilities and noneCapabilities as needed
    console.log('Meshery Capabilities:', mesheryCapabilities);
    console.log('None Capabilities:', noneCapabilities);

    return { mesheryData, noneData, mesheryCapabilities, noneCapabilities };
  } catch (error) {
    // Handle other errors
    console.error('Error in fetchProviders:', error);
    return thunkAPI.rejectWithValue(error?.message);
  }
});

// Helper function to extract capabilities from a provider
/**
 * Helper function to extract capabilities from a provider data object.
 * @param {Record<string, any>} providerData - The provider data object.
 * @returns {any[]} - An array of capabilities extracted from the provider data.
 */
function extractCapabilities(providerData) {
  const capabilities = [];

  if (providerData && providerData.capabilities) {
    Object.keys(providerData.capabilities).forEach((key) => {
      capabilities.push(providerData.capabilities[key]);
    });
  }

  return capabilities;
}

/**
 * Initial state for the provider slice.
 * @type {ProvidersState}
 */
const initialState = {
  providers: undefined,
  status: 'idle',
  error: null,
  selectedProvider: '',
};

const providerSlice = createSlice({
  name: 'providers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.providers = action.payload;
      })
      .addCase(fetchProviders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })
      .addCase(setSelectedProvider, (state, action) => {
        state.selectedProvider = action.payload;
      });
  },
});

/**
 * Action creator to set the selected provider.
 * @param {string} payload - The ID of the selected provider.
 * @returns {PayloadAction<string>} - The action containing the payload.
 */
export const setSelectedProvider = createAction('providers/setSelectedProvider');

export default providerSlice;
