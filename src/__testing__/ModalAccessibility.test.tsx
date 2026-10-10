import { render, screen } from '@testing-library/react';
import React from 'react';
import { Modal } from '../custom/Modal';
import { SistentThemeProvider } from '../theme';

// The Modal primitives transitively import CustomTooltip -> Markdown -> react-markdown (ESM-only).
// Jest's transformIgnorePatterns allowlist excludes the markdown ESM tree, so those leaf modules
// are stubbed here (mirrors DangerConfirmationModal.test.tsx and CatalogFilterSection.test.tsx).
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

    // Does not attach nonexistent aria-describedby or hardcoded slide IDs
    expect(dialog.getAttribute('aria-describedby')).toBeNull();
    expect(labelledBy).not.toBe('alert-dialog-slide-title');
    expect(document.getElementById('alert-dialog-slide-description')).toBeNull();
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

    // Assert order-independently that both dialogs pair 1:1 with distinct title IDs
    const labelIds = dialogs.map((d) => d.getAttribute('aria-labelledby'));
    const titleIds = titles.map((t) => t.getAttribute('id'));

    expect(new Set(labelIds).size).toBe(2);
    expect(new Set(titleIds).size).toBe(2);
    expect([...labelIds].sort()).toEqual([...titleIds].sort());
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

  it('forwards custom aria-labelledby and aria-describedby without reusing aria-labelledby as title id', () => {
    render(
      <SistentThemeProvider>
        <h2 id="external-heading">External Section Heading</h2>
        <Modal
          open
          title="Internal Modal Title"
          aria-labelledby="external-heading"
          aria-describedby="custom-description"
          closeModal={jest.fn()}
        >
          <div id="custom-description">Description text</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    // Dialog targets caller-supplied accessible name & description
    expect(dialog.getAttribute('aria-labelledby')).toBe('external-heading');
    expect(dialog.getAttribute('aria-describedby')).toBe('custom-description');

    // Title element gets its own distinct ID and does NOT collide with external-heading
    const titleId = title.getAttribute('id');
    expect(titleId).toBeTruthy();
    expect(titleId).not.toBe('external-heading');

    // Ensure external-heading remains uniquely owned by the external element in the DOM
    const elementsWithExternalHeading = document.querySelectorAll('#external-heading');
    expect(elementsWithExternalHeading).toHaveLength(1);
    expect(elementsWithExternalHeading[0].tagName.toLowerCase()).toBe('h2');
  });

  it('does not render dangling aria-labelledby when title is absent and not supplied by caller', () => {
    render(
      <SistentThemeProvider>
        <Modal open closeModal={jest.fn()}>
          <div>No Title Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    expect(dialog.getAttribute('aria-describedby')).toBeNull();
  });
});
