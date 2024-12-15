import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface OperatorStateState {
  value: any;
}

const initialState: OperatorStateState = { value: null };

const operatorStateSlice = createSlice({
  name: 'operatorState',
  initialState,
  reducers: {
    setOperatorState: (state, action: PayloadAction<OperatorStateState>) => {
      return action.payload;
    },
    setOperatorSubscription: (state: OperatorStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_OPERATOR_SUBSCRIPTION
      return state;
    },
    setControllerState: (state: OperatorStateState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_CONTROLLER_STATE
      return state;
    }
  }
});

// Actions
export const { setOperatorState, setOperatorSubscription, setControllerState } =
  operatorStateSlice.actions;

// Selectors
export const selectOperatorState = (state: MesheryRootState) => state.operatorState;
export default operatorStateSlice.reducer;
