import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Modal } from '../custom/Modal';
import { SistentThemeProvider } from '../theme';

// The Modal primitives transitively import CustomTooltip -> Markdown ->
// react-markdown (ESM-only). Jest's transformIgnorePatterns allowlist excludes
// the markdown ESM tree, so those leaf modules are stubbed here (mirrors DangerConfirmationModal.test.tsx).
jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => {}
}));

jest.mock('rehype-raw', () => ({
  __esModule: true,
  default: () => {}
}));

describe('Modal header controls accessibility (#1880)', () => {
  it('exposes accessible names for enter-fullscreen and close controls with preserved testids', () => {
    const handleClose = jest.fn();

    render(
      <SistentThemeProvider>
        <Modal open title="Accessible Modal" isFullScreenModeAllowed closeModal={handleClose}>
          <div>Modal content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const enterBtn = screen.getByRole('button', { name: 'Enter fullscreen' });
    expect(enterBtn).toBeTruthy();
    expect(enterBtn.getAttribute('data-testid')).toBe('modal-enter-fullscreen-btn');

    const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
    expect(closeBtn).toBeTruthy();
    expect(closeBtn.getAttribute('data-testid')).toBe('modal-close-btn');
  });

  it('updates accessible name to Exit fullscreen when toggled and toggles fullscreen state', () => {
    render(
      <SistentThemeProvider>
        <Modal open title="Fullscreen Modal" isFullScreenModeAllowed closeModal={jest.fn()}>
          <div>Modal content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const enterBtn = screen.getByRole('button', { name: 'Enter fullscreen' });
    fireEvent.click(enterBtn);

    const exitBtn = screen.getByRole('button', { name: 'Exit fullscreen' });
    expect(exitBtn).toBeTruthy();
    expect(exitBtn.getAttribute('data-testid')).toBe('modal-exit-fullscreen-btn');
    expect(screen.queryByRole('button', { name: 'Enter fullscreen' })).toBeNull();

    // Toggle back to enter fullscreen mode
    fireEvent.click(exitBtn);
    expect(screen.getByRole('button', { name: 'Enter fullscreen' })).toBeTruthy();
  });

  it('controls are focusable and activatable via click', () => {
    render(
      <SistentThemeProvider>
        <Modal open title="Test Modal" isFullScreenModeAllowed closeModal={jest.fn()}>
          <div>Modal content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
    const enterBtn = screen.getByRole('button', { name: 'Enter fullscreen' });

    act(() => {
      closeBtn.focus();
    });
    expect(document.activeElement).toBe(closeBtn);

    act(() => {
      enterBtn.focus();
    });
    expect(document.activeElement).toBe(enterBtn);
  });

  it('calls closeModal when the close button is clicked', () => {
    const handleClose = jest.fn();

    render(
      <SistentThemeProvider>
        <Modal open title="Test Modal" isFullScreenModeAllowed closeModal={handleClose}>
          <div>Modal content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
