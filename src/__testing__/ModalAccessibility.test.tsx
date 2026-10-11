import type { DialogOwnerState, PaperProps } from '@mui/material';
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

  it('supports multi-id aria-labelledby without producing invalid HTML ids on the title element', () => {
    render(
      <SistentThemeProvider>
        <span id="label-prefix">Dialog:</span>
        <span id="label-main">System Status</span>
        <Modal
          open
          title="Internal Title"
          aria-labelledby="label-prefix label-main"
          closeModal={jest.fn()}
        >
          <div>Status content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    expect(dialog.getAttribute('aria-labelledby')).toBe('label-prefix label-main');
    // Title element ID must be a single valid token, never the space-separated list
    const titleId = title.getAttribute('id');
    expect(titleId).toBeTruthy();
    expect(titleId?.includes(' ')).toBe(false);
  });

  it('correctly provides accessible name to role="dialog" for titleless modal via aria-label', () => {
    render(
      <SistentThemeProvider>
        <Modal open aria-label="Settings configuration" closeModal={jest.fn()}>
          <div>Settings content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const root = dialog.closest('.MuiDialog-root');

    // Dialog root role="presentation" div must not receive aria-label
    expect(root).not.toBeNull();
    expect(root?.getAttribute('aria-label')).toBeNull();

    // Accessible name is attached directly to role="dialog"
    expect(dialog.getAttribute('aria-label')).toBe('Settings configuration');
    // Suppresses dangling generated aria-labelledby so aria-label is not obscured
    expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    expect(dialog.getAttribute('aria-describedby')).toBeNull();
    // No title header rendered
    expect(screen.queryByTestId('modal-title')).toBeNull();
  });

  it('does not leak aria-label onto the dialog root when both title and aria-label are provided and prioritizes aria-labelledby', () => {
    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Modal Header"
          aria-label="Modal Header Description"
          closeModal={jest.fn()}
        >
          <div>Modal Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');
    const root = dialog.closest('.MuiDialog-root');

    expect(root).not.toBeNull();
    expect(root?.getAttribute('aria-label')).toBeNull();
    // accname specification: aria-labelledby pointing to title wins; aria-label is omitted
    expect(dialog.getAttribute('aria-label')).toBeNull();
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
  });

  it('applies caller aria-describedby to role="dialog" and keeps it off the dialog root', () => {
    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Described Modal"
          aria-describedby="custom-description-id"
          closeModal={jest.fn()}
        >
          <div id="custom-description-id">Description content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const root = dialog.closest('.MuiDialog-root');

    expect(dialog.getAttribute('aria-describedby')).toBe('custom-description-id');
    expect(root?.getAttribute('aria-describedby')).toBeNull();
  });

  it('renders titleless modal with only aria-labelledby without a title header', () => {
    render(
      <SistentThemeProvider>
        <span id="external-section-label">Section Heading</span>
        <Modal open aria-labelledby="external-section-label" closeModal={jest.fn()}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('external-section-label');
    expect(dialog.getAttribute('aria-label')).toBeNull();
    expect(screen.queryByTestId('modal-title')).toBeNull();
  });

  it('preserves object-valued slotProps.paper custom properties alongside accessibility attributes', () => {
    const paperProps: PaperProps & { 'data-testid'?: string } = {
      className: 'custom-paper-classname',
      'data-testid': 'customized-paper-slot',
      elevation: 12
    };

    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Customized Paper Modal"
          closeModal={jest.fn()}
          slotProps={{
            paper: paperProps
          }}
        >
          <div>Custom paper content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    // Retains caller's slotProps.paper properties
    expect(dialog.classList.contains('custom-paper-classname')).toBe(true);
    expect(dialog.getAttribute('data-testid')).toBe('customized-paper-slot');

    // Merges correct accessibility attributes
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
  });

  it('preserves callback-valued slotProps.paper with ownerState and merged accessibility attributes', () => {
    const paperCallback = jest.fn((ownerState: DialogOwnerState) => ({
      className: `dynamic-paper-${ownerState.fullWidth ? 'full' : 'fixed'}`,
      'data-testid': 'callback-paper-slot',
      'data-fullscreen': String(ownerState.fullScreen)
    }));

    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Callback Paper Modal"
          closeModal={jest.fn()}
          slotProps={{
            paper: paperCallback
          }}
        >
          <div>Callback paper content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    // Callback was invoked with ownerState
    expect(paperCallback).toHaveBeenCalled();
    const passedOwnerState = paperCallback.mock.calls[0][0];
    expect(passedOwnerState).toBeDefined();

    // Returned attributes are preserved
    expect(dialog.getAttribute('data-testid')).toBe('callback-paper-slot');
    expect(dialog.classList.contains('dynamic-paper-full')).toBe(true);

    // Accessibility attributes are merged
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
  });

  it('honors aria precedence in slotProps.paper (Modal prop > slotProps.paper > generated title id)', () => {
    // 1. Modal-level prop wins over slotProps.paper
    const { unmount } = render(
      <SistentThemeProvider>
        <Modal
          open
          title="Precedence Modal"
          aria-labelledby="modal-level-labelledby"
          aria-describedby="modal-level-describedby"
          closeModal={jest.fn()}
          slotProps={{
            paper: {
              'aria-labelledby': 'paper-level-labelledby',
              'aria-describedby': 'paper-level-describedby'
            } as PaperProps & { 'aria-labelledby'?: string; 'aria-describedby'?: string }
          }}
        >
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    let dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('modal-level-labelledby');
    expect(dialog.getAttribute('aria-describedby')).toBe('modal-level-describedby');
    unmount();

    // 2. slotProps.paper wins over generated title id
    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Title Fallback Modal"
          closeModal={jest.fn()}
          slotProps={{
            paper: {
              'aria-labelledby': 'paper-level-labelledby-only',
              'aria-describedby': 'paper-level-describedby-only'
            } as PaperProps & { 'aria-labelledby'?: string; 'aria-describedby'?: string }
          }}
        >
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');
    expect(dialog.getAttribute('aria-labelledby')).toBe('paper-level-labelledby-only');
    expect(dialog.getAttribute('aria-labelledby')).not.toBe(title.getAttribute('id'));
    expect(dialog.getAttribute('aria-describedby')).toBe('paper-level-describedby-only');
  });

  it('unmounting and remounting a modal yields a title id matching aria-labelledby on each mount', () => {
    const { unmount } = render(
      <SistentThemeProvider>
        <Modal open title="Remount Modal" closeModal={jest.fn()}>
          <div>First Run</div>
        </Modal>
      </SistentThemeProvider>
    );

    let dialog = screen.getByRole('dialog');
    let title = screen.getByTestId('modal-title');
    const firstId = title.getAttribute('id');
    expect(firstId).toBeTruthy();
    expect(dialog.getAttribute('aria-labelledby')).toBe(firstId);

    unmount();

    render(
      <SistentThemeProvider>
        <Modal open title="Remount Modal" closeModal={jest.fn()}>
          <div>Second Run</div>
        </Modal>
      </SistentThemeProvider>
    );

    dialog = screen.getByRole('dialog');
    title = screen.getByTestId('modal-title');
    const secondId = title.getAttribute('id');
    expect(secondId).toBeTruthy();
    expect(dialog.getAttribute('aria-labelledby')).toBe(secondId);
  });

  it('resolves accessible name from title, aria-label, or external aria-labelledby at runtime', () => {
    const noop = jest.fn();

    // (a) title only: accessible name matches title text
    const { unmount: unmountTitle } = render(
      <SistentThemeProvider>
        <Modal open title="Visible Title" closeModal={noop}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );
    expect(screen.getByRole('dialog', { name: 'Visible Title' })).toBeTruthy();
    unmountTitle();

    // (b) aria-label only: accessible name matches aria-label
    const { unmount: unmountLabel } = render(
      <SistentThemeProvider>
        <Modal open aria-label="Explicit Aria Label" closeModal={noop}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );
    expect(screen.getByRole('dialog', { name: 'Explicit Aria Label' })).toBeTruthy();
    unmountLabel();

    // (c) aria-labelledby only: accessible name resolves external element text
    const { unmount: unmountLabelledby } = render(
      <SistentThemeProvider>
        <h2 id="external-heading-text">External Heading Title</h2>
        <Modal open aria-labelledby="external-heading-text" closeModal={noop}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );
    expect(screen.getByRole('dialog', { name: 'External Heading Title' })).toBeTruthy();
    unmountLabelledby();
  });
});
