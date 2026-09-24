import { styled } from '@mui/material';
import { GRAY, LIGHT_GRAY, WHITE } from '../../theme';

export const NotificationPopoverContent = styled('div')({
  width: '360px',
  maxHeight: '420px',
  display: 'flex',
  flexDirection: 'column',
  background: WHITE,

  '.notification-center-header': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75rem 1rem',
    borderBottom: `1px solid ${LIGHT_GRAY}`
  },

  '.notification-center-list': {
    overflowY: 'auto',
    flex: 1
  },

  '.notification-center-empty': {
    padding: '2rem 1rem',
    textAlign: 'center',
    color: GRAY
  }
});

export const NotificationListItemRoot = styled('div')<{ read: boolean }>(({ read }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.5rem',
  padding: '0.75rem 1rem',
  borderBottom: `1px solid ${LIGHT_GRAY}`,
  background: read ? WHITE : 'rgba(25, 118, 210, 0.06)',

  '.notification-center-item-message': {
    margin: 0,
    flex: 1,
    wordBreak: 'break-word'
  },

  '.notification-center-item-time': {
    color: GRAY,
    fontSize: '0.75rem',
    marginTop: '0.25rem'
  },

  '.notification-center-item-actions': {
    display: 'flex',
    gap: '0.25rem',
    flexShrink: 0
  }
}));
