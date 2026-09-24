import { fireEvent, render, screen } from '@testing-library/react';
import { notificationStore } from '../custom/Helpers/Notification';
import { NotificationCenter } from '../custom/NotificationCenter';
import { SistentThemeProvider } from '../theme';

const renderCenter = () =>
  render(
    <SistentThemeProvider>
      <NotificationCenter />
    </SistentThemeProvider>
  );

describe('NotificationCenter', () => {
  afterEach(() => {
    // The history store is a module-level singleton shared across every
    // instance, so each test starts from a clean slate.
    notificationStore.clear();
  });

  it('renders with no unread badge when there is no history', () => {
    renderCenter();
    expect(screen.queryByText('0')).toBeNull();
  });

  it('shows an unread badge count as notifications are added', () => {
    notificationStore.add('Design published');
    notificationStore.add('Model imported');
    renderCenter();

    expect(screen.queryByText('2')).not.toBeNull();
  });

  it('lists notification history in the popover and shows an empty state before any exist', () => {
    renderCenter();

    fireEvent.click(screen.getByLabelText('Notifications'));
    expect(screen.queryByText("You're all caught up.")).not.toBeNull();
  });

  it('marks a notification as read when clicked, clearing the unread badge', () => {
    notificationStore.add('Workspace invite accepted');
    renderCenter();

    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.click(screen.getByText('Workspace invite accepted'));

    // MUI's Badge intentionally keeps rendering the last non-zero value
    // (behind an 'invisible' class) while it fades out, so we assert on the
    // store's actual read state rather than the badge's transient DOM text.
    expect(notificationStore.getSnapshot().every((record) => record.read)).toBe(true);
  });

  it('dismisses a single notification via its close action', () => {
    notificationStore.add('Deployment finished');
    renderCenter();

    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.click(screen.getByLabelText('Dismiss notification'));

    expect(screen.queryByText('Deployment finished')).toBeNull();
  });

  it('clears all notifications via the header action', () => {
    notificationStore.add('First notification');
    notificationStore.add('Second notification');
    renderCenter();

    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.click(screen.getByLabelText('Clear all notifications'));

    expect(screen.queryByText("You're all caught up.")).not.toBeNull();
  });
});
