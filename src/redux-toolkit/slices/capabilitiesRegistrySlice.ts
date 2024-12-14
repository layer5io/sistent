import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface CapabilitiesRegistryState {
  [key: string]: any;
}
// Initial state
const initialState: CapabilitiesRegistryState = null;
// Slice
const capabilitiesRegistrySlice = createSlice({
  name: 'capabilitiesRegistry',
  initialState,
  reducers: {
    setCapabilitiesRegistry: (state, action: PayloadAction<CapabilitiesRegistryState>) => {
      return action.payload;
    },
    updateCapabilityRegistry: (state: CapabilitiesRegistryState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for UPDATE_CAPABILITY_REGISTRY
      return state;
    }
  }
});
// Actions
export const { setCapabilitiesRegistry, updateCapabilityRegistry } =
  capabilitiesRegistrySlice.actions;
// Selectors
export const selectCapabilitiesRegistry = (state: MesheryRootState) => state.capabilitiesRegistry;
export default capabilitiesRegistrySlice.reducer;
