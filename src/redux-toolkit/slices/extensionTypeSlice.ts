import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface ExtensionTypeState {
  value: string;
}

const initialState: ExtensionTypeState = { value: '' };

const extensionTypeSlice = createSlice({
  name: 'extensionType',
  initialState,
  reducers: {
    setExtensionType: (state, action: PayloadAction<ExtensionTypeState>) => {
      return action.payload;
    },
    updateExtensionType: (state: ExtensionTypeState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_EXTENSION_TYPE
      return state;
    }
  }
});

// Actions
export const { setExtensionType } = extensionTypeSlice.actions;

// Thunk action creator
export const updateExtensionType =
  (payload: ExtensionTypeState) => (dispatch: MesheryReduxAppDispatch) => {
    dispatch(setExtensionType(payload));
  };

// Selectors
export const selectExtensionType = (state: MesheryRootState) => state.extensionType;
export default extensionTypeSlice.reducer;
