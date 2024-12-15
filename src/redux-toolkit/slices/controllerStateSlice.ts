import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
export interface ControllerStateState {
  value: any;
}

const initialState: ControllerStateState = { value: null };

const controllerStateSlice = createSlice({
  name: 'controllerState',
  initialState,
  reducers: {
    setControllerState: (state, action: PayloadAction<ControllerStateState>) => {
      return action.payload;
    }
    /*
    setControllerState: (state: ControllerStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_CONTROLLER_STATE
      return state;
    }
    */
  }
});

// Actions
export const { setControllerState } = controllerStateSlice.actions;

// Selectors
export const selectControllerState = (state: MesheryRootState) => state.controllerState;
export default controllerStateSlice.reducer;
