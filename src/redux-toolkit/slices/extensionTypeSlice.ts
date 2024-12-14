import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface ExtensionTypeState {
  [key: string]: any;
}
// Initial state
const initialState: ExtensionTypeState = '';
// Slice
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
export const { setExtensionType, updateExtensionType } = extensionTypeSlice.actions;
// Selectors
export const selectExtensionType = (state: MesheryRootState) => state.extensionType;
export default extensionTypeSlice.reducer;
