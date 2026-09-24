import React from 'react';
import { Badge, Divider, IconButton, Popover, Stack, Typography } from '../../base';
import { BellIcon, CloseIcon, DoneAllIcon } from '../../icons';
import { useNotificationStore } from '../Helpers/Notification';
import { NotificationListItemRoot, NotificationPopoverContent } from './style';

export interface NotificationCenterProps {
  /** Optional accessible label for the bell trigger button. */
  ariaLabel?: string;
}

const formatRelativeTime = (timestamp: number): string => {
  const diffSeconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (diffSeconds < 60) return 'just now';
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  ariaLabel = 'Notifications'
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const { notifications, unreadCount, markRead, markAllRead, dismiss, clear } =
    useNotificationStore();

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-label={ariaLabel} onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error" max={99}>
          <BellIcon />
        </Badge>
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <NotificationPopoverContent>
          <div className="notification-center-header">
            <Typography variant="subtitle1">Notifications</Typography>
            <Stack direction="row" spacing={0.5}>
              <IconButton
                aria-label="Mark all as read"
                size="small"
                onClick={markAllRead}
                disabled={unreadCount === 0}
              >
                <DoneAllIcon width="1.1rem" height="1.1rem" />
              </IconButton>
              <IconButton
                aria-label="Clear all notifications"
                size="small"
                onClick={clear}
                disabled={notifications.length === 0}
              >
                <CloseIcon width="1.1rem" height="1.1rem" />
              </IconButton>
            </Stack>
          </div>

          <div className="notification-center-list">
            {notifications.length === 0 ? (
              <div className="notification-center-empty">
                <Typography variant="body2">You're all caught up.</Typography>
              </div>
            ) : (
              notifications.map((notification) => (
                <NotificationListItemRoot key={notification.id} read={notification.read}>
                  <div
                    className="notification-center-item-message"
                    onClick={() => !notification.read && markRead(notification.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <Typography variant="body2">{notification.message}</Typography>
                    <Typography className="notification-center-item-time" component="p">
                      {formatRelativeTime(notification.createdAt)}
                    </Typography>
                  </div>
                  <div className="notification-center-item-actions">
                    <IconButton
                      aria-label="Dismiss notification"
                      size="small"
                      onClick={() => dismiss(notification.id)}
                    >
                      <CloseIcon width="0.9rem" height="0.9rem" />
                    </IconButton>
                  </div>
                </NotificationListItemRoot>
              ))
            )}
          </div>
          {notifications.length > 0 && <Divider />}
        </NotificationPopoverContent>
      </Popover>
    </>
  );
};

export default NotificationCenter;
