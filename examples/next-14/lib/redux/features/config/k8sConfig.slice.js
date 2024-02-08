import { promisifiedDataFetch } from '@/utils/dataFetch';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { K8sConfigState } from '../../types';
import { deleteKubernetesConfig } from './k8sConfig.thunk';

/**
 * Interface for providing extra arguments to async thunk functions.
 * @interface ExtraArgument
 * @property {(data: any) => void} successCallback - Callback function to handle success.
 * @property {(error: any) => void} errorCallback - Callback function to handle error.
 */

/**
 * Async thunk to load active Kubernetes contexts.
 */
export const loadActiveK8sContexts = createAsyncThunk(
  'kubernetes/loadActiveContexts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await promisifiedDataFetch('/api/system/sync');

      if (res?.k8sConfig) {
        return res.k8sConfig;
      } else {
        throw new Error('No Kubernetes configurations found');
      }
    } catch (error) {
      console.error('An error occurred while loading k8sconfig', error);
      return rejectWithValue(error?.message);
    }
  },
);

/**
 * Initial state for the Kubernetes configuration slice.
 * @type {K8sConfigState}
 */
const initialState = {
  k8sConfig: [],
};

/**
 * Slice for managing Kubernetes configuration.
 */
const k8sConfigSlice = createSlice({
  name: 'k8sConfig',
  initialState,
  reducers: {
    /**
     * Reducer to update Kubernetes configuration.
     * @param {K8sConfigState} state - Current state.
     * @param {PayloadAction<K8sConfigState>} action - Payload action.
     */
    updateK8SConfig: (state, action) => {
      return action.payload.k8sConfig;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadActiveK8sContexts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deleteKubernetesConfig.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { updateK8SConfig } = k8sConfigSlice.actions;
export default k8sConfigSlice;
