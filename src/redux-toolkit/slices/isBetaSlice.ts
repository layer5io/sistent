import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface IsBetaState {
  [key: string]: any;
}
// Initial state
const initialState: IsBetaState = false;
// Slice
const isBetaSlice = createSlice({
  name: 'isBeta',
  initialState,
  reducers: {
    setIsBeta: (state, action: PayloadAction<IsBetaState>) => {
      return action.payload;
    },
    updateBetaBadge: (state: IsBetaState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_BETA_BADGE
      return state;
    }
  }
});
// Actions
export const { setIsBeta, updateBetaBadge } = isBetaSlice.actions;
// Selectors
export const selectIsBeta = (state: MesheryRootState) => state.isBeta;
export default isBetaSlice.reducer;
