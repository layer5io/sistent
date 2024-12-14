import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface ControllerStateState {
  [key: string]: any;
}
// Initial state
const initialState: ControllerStateState = null;
// Slice
const controllerStateSlice = createSlice({
  name: 'controllerState',
  initialState,
  reducers: {
    setControllerState: (state, action: PayloadAction<ControllerStateState>) => {
      return action.payload;
    },
    setControllerState: (state: ControllerStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_CONTROLLER_STATE
      return state;
    }
  }
});
// Actions
export const { setControllerState, setControllerState1 } = controllerStateSlice.actions;
// Selectors
export const selectControllerState = (state: MesheryRootState) => state.controllerState;
export default controllerStateSlice.reducer;
