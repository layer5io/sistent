import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryReduxAppDispatch, MesheryRootState } from '../store';

export interface KeysState {
  [key: string]: any;
}

const initialState: KeysState = null;

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

// Thunk action creator
export const updateKeys = (payload: KeysState) => (dispatch: MesheryReduxAppDispatch) => {
  dispatch(setKeys(payload));
};

// Selectors
export const selectKeys = (state: MesheryRootState) => state.keys;
export default keysSlice.reducer;
