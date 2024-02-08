export const NOTIFICATION_STATUS = {
  VIEWED: 'viewed',
  NEW: 'new',
};

export const NOTIFICATION_EVENT_TYPES = {
  SUCCESS: {
    type: 'success',
  },
  DEFAULT: {
    type: 'default',
  },
  INFO: {
    type: 'info',
  },
  WARNING: {
    type: 'warning',
  },
  ERROR: {
    type: 'error',
  },
};

export const SERVER_EVENT_TYPES = {
  0: NOTIFICATION_EVENT_TYPES.SUCCESS,
  1: NOTIFICATION_EVENT_TYPES.WARNING,
  2: NOTIFICATION_EVENT_TYPES.ERROR,
};
