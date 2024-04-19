import { styled } from '@mui/material';
import { YELLOW_SEA } from '../../theme';

export const NotificationWrapper = styled('div')({
  position: 'fixed',
  bottom: '1rem',
  left: '1.5rem',
  zIndex: 999,
  maxWidth: '70%',

  '.notification-container': {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderRadius: '5px',
    boxShadow: '0 2px 5px 0 rgb(0 0 0 / 26%)',
    background: YELLOW_SEA,
    animation: '$fadeIn .8s',

    p: {
      margin: 0,
      marginRight: '15px'
    },

    '.notification-cross-icon': {
      cursor: 'pointer',
      width: '1.5rem',
      height: '1.5rem'
    }
  },

  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateX(-10%)'
    },
    to: {
      opacity: 1,
      transform: 'translateX(0)'
    }
  }
});
