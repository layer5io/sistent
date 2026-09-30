import { act, render, screen } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { useNotificationHandler } from '../custom/Helpers/Notification';

let notify: ReturnType<typeof useNotificationHandler>;

function Probe() {
  notify = useNotificationHandler();
  return null;
}

const renderUnderHostProvider = () =>
  render(
    <SnackbarProvider maxSnack={10} autoHideDuration={null}>
      <Probe />
    </SnackbarProvider>
  );

describe('useNotificationHandler', () => {
  it('shows a plain message in the host SnackbarProvider', async () => {
    renderUnderHostProvider();
    act(() => notify('Saved'));

    expect(await screen.findAllByText('Saved')).toHaveLength(1);
  });

  it('shows a message with options exactly once', async () => {
    renderUnderHostProvider();
    act(() => notify('Failed', { variant: 'error' }));

    // The previous implementation enqueued once from state and once with the
    // options, so every notify with options rendered two snackbars.
    expect(await screen.findAllByText('Failed')).toHaveLength(1);
  });

  it('returns a stable function across renders', () => {
    const { rerender } = renderUnderHostProvider();
    const first = notify;
    rerender(
      <SnackbarProvider maxSnack={10} autoHideDuration={null}>
        <Probe />
      </SnackbarProvider>
    );

    expect(notify).toBe(first);
  });
});
