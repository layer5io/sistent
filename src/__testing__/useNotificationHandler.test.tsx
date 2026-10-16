import { act, renderHook, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { useNotificationHandler } from '../custom/Helpers/Notification';

const renderNotify = () =>
  renderHook(() => useNotificationHandler(), {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <SnackbarProvider>{children}</SnackbarProvider>
    )
  }).result;

describe('useNotificationHandler', () => {
  it('shows one snackbar for a call with options', () => {
    const notify = renderNotify();

    act(() => notify.current('Saved', { variant: 'success' }));

    expect(screen.getAllByText('Saved')).toHaveLength(1);
  });

  it('shows one snackbar for a call without options', () => {
    const notify = renderNotify();

    act(() => notify.current('Loaded'));

    expect(screen.getAllByText('Loaded')).toHaveLength(1);
  });

  it('accepts a snackbar position', () => {
    const notify = renderNotify();

    act(() =>
      notify.current('Positioned', { anchorOrigin: { vertical: 'top', horizontal: 'right' } })
    );

    expect(screen.getAllByText('Positioned')).toHaveLength(1);
  });

  it('shows every message when called more than once in one update', () => {
    const notify = renderNotify();

    act(() => {
      notify.current('First');
      notify.current('Second');
    });

    expect(screen.getAllByText('First')).toHaveLength(1);
    expect(screen.getAllByText('Second')).toHaveLength(1);
  });
});
