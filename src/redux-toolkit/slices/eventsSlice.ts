import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { MesheryRootState } from '../store';

export interface EventsState {
  items: any[];
}

const initialState: EventsState = { items: [] };

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventsState>) => {
      return action.payload;
    }
  }
});

// Actions
export const { setEvents } = eventsSlice.actions;

// Selectors
export const selectEvents = (state: MesheryRootState) => state.events;
export default eventsSlice.reducer;
