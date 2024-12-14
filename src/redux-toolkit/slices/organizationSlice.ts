import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';
// State interface
export interface OrganizationState {
  [key: string]: any;
}
// Initial state
const initialState: OrganizationState = null;
// Slice
const organizationSlice = createSlice({
  name: 'organization',
  initialState,
  reducers: {
    /*
    setOrganization: (state, action: PayloadAction<OrganizationState>) => {
      return action.payload;
    },
    */
    setOrganization: (state: OrganizationState, action: PayloadAction<any>) => {
      // TODO: Implement reducer logic for SET_ORGANIZATION
      return state;
    }
  }
});
// Actions
export const { setOrganization } = organizationSlice.actions;
// Selectors
export const selectOrganization = (state: MesheryRootState) => state.organization;
export default organizationSlice.reducer;
