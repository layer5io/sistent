import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface KeysState {
  [key: string]: any;
}
// Initial state
const initialState: KeysState = null;
// Slice
const keysSlice = createSlice({
  name: 'keys',
  initialState,
  reducers: {
    /*
    setKeys: (state, action: PayloadAction<KeysState>) => {
      return action.payload;
    },
    */
    setKeys: (state: KeysState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_KEYS
      return state;
    }
  }
});
// Actions
export const { setKeys } = keysSlice.actions;
// Selectors
export const selectKeys = (state: MesheryRootState) => state.keys;
export default keysSlice.reducer;
