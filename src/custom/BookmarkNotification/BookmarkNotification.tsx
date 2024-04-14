import React from 'react';
import { CrossCircleIcon } from '../../icons';
import { NotificationWrapper } from './style';

interface NotificationProps {
  showNotification: boolean;
  closeNotification: () => void;
}

const BookmarkNotification: React.FC<NotificationProps> = ({
  showNotification,
  closeNotification
}) => {
  return showNotification ? (
    <NotificationWrapper>
      <div className="notification-container">
        <p>
          We track your progress so you don't need to worry about the 'mesh' of remembering where
          you left.
        </p>
        <CrossCircleIcon className="notification-cross-icon" onClick={closeNotification} />
      </div>
    </NotificationWrapper>
  ) : null;
};

export default BookmarkNotification;
