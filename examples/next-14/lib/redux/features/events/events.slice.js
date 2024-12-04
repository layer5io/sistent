import { SEVERITY, STATUS } from '@/components/NotificationCenter/constants/notification';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

const initialState = {
  current_view: {
    page: 1,
    page_size: 10,
    filters: {
      initial: true,
    },
    has_more: true,
  },

  isNotificationCenterOpen: false,
};

const defaultEventProperties = {
  severity: SEVERITY.INFO,
  status: STATUS.UNREAD,
};

const eventsEntityAdapter = createEntityAdapter({
  selectId: (event) => event.id,
  //sort based on update_at timestamp(utc)
  sortComparer: (a, b) => {
    if (b?.created_at?.localeCompare && a?.created_at?.localeCompare) {
      return b.created_at?.localeCompare(a.created_at);
    }
    return 0;
  },
});

export const eventsSlice = createSlice({
  name: 'events',
  initialState: eventsEntityAdapter.getInitialState(initialState),
  reducers: {
    clearEvents: (state) => {
      state.events = [];
    },

    setEvents: (state, action) => {
      eventsEntityAdapter.removeAll(state);
      eventsEntityAdapter.addMany(state, action.payload);

      state.current_view.has_more = action.payload.length == 0 ? false : true;
    },

    pushEvents: (state, action) => {
      eventsEntityAdapter.addMany(state, action.payload);
      state.current_view.has_more = action.payload.length == 0 ? false : true;
    },

    pushEvent: (state, action) => {
      const event = {
        ...action.payload,
        severity: action.payload?.severity?.trim() || defaultEventProperties.severity,
        status: action.payload?.status?.trim() || defaultEventProperties.status,
      };
      eventsEntityAdapter.addOne(state, event);
      // state.events = [event, ...state.events]
    },

    updateEvent: eventsEntityAdapter.updateOne,
    updateEvents: eventsEntityAdapter.updateMany,
    updateIsEventChecked: (state, { payload }) => {
      const { id, value } = payload;
      eventsEntityAdapter.updateOne(state, {
        id,
        changes: {
          checked: value,
        },
      });
    },

    updateCheckAllEvents: (state, { payload }) => {
      const updates = Object.keys(state.entities).map((id) => ({
        id,
        changes: {
          checked: payload,
        },
      }));
      console.log('updates', updates);
      eventsEntityAdapter.updateMany(state, updates);
    },

    clearCurrentView: (state) => {
      state.current_view = initialState.current_view;
      state.events = [];
    },

    setCurrentView: (state, action) => {
      state.current_view = action.payload;
    },

    toggleNotificationCenter: (state) => {
      state.isNotificationCenterOpen = !state.isNotificationCenterOpen;
    },

    closeNotificationCenter: (state) => {
      state.isNotificationCenterOpen = false;
    },
  },
});

export const {
  pushEvent,
  clearEvents,
  setEvents,
  clearCurrentView,
  updateIsEventChecked,
  updateCheckAllEvents,
  pushEvents,
  setCurrentView,
  updateEvent,
  toggleNotificationCenter,
  closeNotificationCenter,
  updateEvents,
} = eventsSlice.actions;

export default eventsSlice;
