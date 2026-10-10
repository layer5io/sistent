import { render, screen } from '@testing-library/react';
import React from 'react';
import { Modal } from '../custom/Modal';
import { SistentThemeProvider } from '../theme';

// Mock react-markdown and related ESM-only packages transitively reached by CustomTooltip
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

describe('Modal accessibility contract (#1864)', () => {
  it('connects dialog aria-labelledby to the rendered title element id by default', () => {
    render(
      <SistentThemeProvider>
        <Modal open title="Confirmation Dialog" closeModal={jest.fn()}>
          <div>Modal Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    const labelledBy = dialog.getAttribute('aria-labelledby');
    expect(labelledBy).toBeTruthy();
    expect(title.getAttribute('id')).toBe(labelledBy);
    expect(title.textContent).toBe('Confirmation Dialog');

    // Does not attach nonexistent aria-describedby
    expect(dialog.getAttribute('aria-describedby')).toBeNull();
  });

  it('generates distinct IDs for concurrently mounted modal instances to prevent DOM collision', () => {
    render(
      <SistentThemeProvider>
        <Modal open title="Modal One" closeModal={jest.fn()}>
          <div>Content One</div>
        </Modal>
        <Modal open title="Modal Two" closeModal={jest.fn()}>
          <div>Content Two</div>
        </Modal>
      </SistentThemeProvider>
    );

    // MUI Dialog applies aria-hidden to inert backdrop siblings; query with hidden: true
    const dialogs = screen.getAllByRole('dialog', { hidden: true });
    const titles = screen.getAllByTestId('modal-title');

    expect(dialogs).toHaveLength(2);
    expect(titles).toHaveLength(2);

    const labelId1 = dialogs[0].getAttribute('aria-labelledby');
    const labelId2 = dialogs[1].getAttribute('aria-labelledby');

    expect(labelId1).toBeTruthy();
    expect(labelId2).toBeTruthy();
    expect(labelId1).not.toBe(labelId2);
    expect(titles[0].getAttribute('id')).toBe(labelId1);
    expect(titles[1].getAttribute('id')).toBe(labelId2);
  });

  it('derives title id from caller-provided id prop', () => {
    render(
      <SistentThemeProvider>
        <Modal open id="delete-confirmation" title="Delete Resource" closeModal={jest.fn()}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    expect(document.getElementById('delete-confirmation')).toBeTruthy();
    expect(dialog.getAttribute('aria-labelledby')).toBe('delete-confirmation-title');
    expect(title.getAttribute('id')).toBe('delete-confirmation-title');
    expect(title.textContent).toBe('Delete Resource');
  });

  it('forwards custom aria-labelledby and aria-describedby when explicitly supplied', () => {
    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Custom ARIA Dialog"
          aria-labelledby="custom-label"
          aria-describedby="custom-description"
          closeModal={jest.fn()}
        >
          <div id="custom-description">Description text</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    expect(dialog.getAttribute('aria-labelledby')).toBe('custom-label');
    expect(dialog.getAttribute('aria-describedby')).toBe('custom-description');
    expect(title.getAttribute('id')).toBe('custom-label');
  });

  it('does not attach hardcoded alert-dialog-slide-description or alert-dialog-slide-title', () => {
    render(
      <SistentThemeProvider>
        <Modal open title="Clean Modal" closeModal={jest.fn()}>
          <div>Body</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).not.toBe('alert-dialog-slide-title');
    expect(dialog.getAttribute('aria-describedby')).toBeNull();
    expect(document.getElementById('alert-dialog-slide-description')).toBeNull();
  });
});
