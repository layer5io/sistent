import type { DialogOwnerState, PaperProps } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Modal, useModal } from '../custom/Modal';
import { SistentThemeProvider } from '../theme';

// The Modal primitives transitively import CustomTooltip -> Markdown -> react-markdown (ESM-only).
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

    const dialogs = screen.getAllByRole('dialog', { hidden: true });
    const titles = screen.getAllByTestId('modal-title');

    expect(dialogs).toHaveLength(2);
    expect(titles).toHaveLength(2);

    const labelIds = dialogs.map((d) => d.getAttribute('aria-labelledby'));
    const titleIds = titles.map((t) => t.getAttribute('id'));

    expect(new Set(labelIds).size).toBe(2);
    expect(new Set(titleIds).size).toBe(2);
    expect([...labelIds].sort()).toEqual([...titleIds].sort());
  });

  it('derives title id from caller-provided id prop when valid', () => {
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

  it('handles caller id with whitespace safely without colliding with hyphenated or encoded IDs', () => {
    render(
      <SistentThemeProvider>
        <Modal open id="my custom modal id" title="Modal With Spaces" closeModal={jest.fn()}>
          <div>Content 1</div>
        </Modal>
        <Modal open id="my-custom-modal-id" title="Modal With Hyphens" closeModal={jest.fn()}>
          <div>Content 2</div>
        </Modal>
        <Modal
          open
          id="my_x20_custom_x20_modal_x20_id"
          title="Modal With Underscores"
          closeModal={jest.fn()}
        >
          <div>Content 3</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialogs = screen.getAllByRole('dialog', { hidden: true });
    const titles = screen.getAllByTestId('modal-title');

    expect(dialogs).toHaveLength(3);
    expect(titles).toHaveLength(3);

    const labelIds = dialogs.map((d) => d.getAttribute('aria-labelledby'));
    const titleIds = titles.map((t) => t.getAttribute('id'));

    // All three concurrently mounted modals receive distinct title IDs
    expect(new Set(labelIds).size).toBe(3);
    expect(new Set(titleIds).size).toBe(3);

    // Title ID for the space-containing input must never contain whitespace
    for (const tid of titleIds) {
      expect(tid?.includes(' ')).toBe(false);
    }

    // Original ID remains intact on the dialog root
    const roots = dialogs.map((d) => d.closest('.MuiDialog-root')?.getAttribute('id'));
    expect(roots).toContain('my custom modal id');
    expect(roots).toContain('my-custom-modal-id');
    expect(roots).toContain('my_x20_custom_x20_modal_x20_id');
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

    expect(dialog.getAttribute('aria-labelledby')).toBe('external-heading');
    expect(dialog.getAttribute('aria-describedby')).toBe('custom-description');

    const titleId = title.getAttribute('id');
    expect(titleId).toBeTruthy();
    expect(titleId).not.toBe('external-heading');
  });

  it('supports multi-id aria-labelledby without producing invalid HTML ids on the title element', () => {
    render(
      <SistentThemeProvider>
        <span id="prefix">Prefix</span>
        <span id="suffix">Suffix</span>
        <Modal open title="Multi Label" aria-labelledby="prefix suffix" closeModal={jest.fn()}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');

    expect(dialog.getAttribute('aria-labelledby')).toBe('prefix suffix');
    expect(title.getAttribute('id')?.includes(' ')).toBe(false);
  });

  it('correctly provides accessible name to role="dialog" for titleless modal via aria-label', () => {
    render(
      <SistentThemeProvider>
        <Modal open aria-label="Settings configuration" closeModal={jest.fn()}>
          <div>Settings content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog', { name: 'Settings configuration' });
    const root = dialog.closest('.MuiDialog-root');

    expect(root?.getAttribute('aria-label')).toBeNull();
    expect(dialog.getAttribute('aria-label')).toBe('Settings configuration');
    expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    expect(screen.queryByTestId('modal-title')).toBeNull();
  });

  it('does not leak aria-label onto the dialog root when both title and aria-label are provided and prioritizes aria-labelledby', () => {
    render(
      <SistentThemeProvider>
        <Modal open title="Modal Header" aria-label="Suppressed Label" closeModal={jest.fn()}>
          <div>Modal Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const dialog = screen.getByRole('dialog', { name: 'Modal Header' });
    const title = screen.getByTestId('modal-title');
    const root = dialog.closest('.MuiDialog-root');

    expect(root?.getAttribute('aria-label')).toBeNull();
    expect(dialog.getAttribute('aria-label')).toBeNull();
    expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
  });

  it('honors ARIA precedence across Modal props and slotProps.paper', () => {
    // 1. Modal-level aria-label wins over Paper-level aria-labelledby in titleless modal
    const { unmount: unmount1 } = render(
      <SistentThemeProvider>
        <Modal
          open
          aria-label="Modal Level Label"
          closeModal={jest.fn()}
          slotProps={{ paper: { 'aria-labelledby': 'paper-labelledby-id' } as PaperProps }}
        >
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );
    let dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-label')).toBe('Modal Level Label');
    expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    unmount1();

    // 2. Modal-level aria-labelledby wins over Paper-level aria-labelledby
    const { unmount: unmount2 } = render(
      <SistentThemeProvider>
        <Modal
          open
          aria-labelledby="modal-primary-id"
          closeModal={jest.fn()}
          slotProps={{ paper: { 'aria-labelledby': 'paper-secondary-id' } as PaperProps }}
        >
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );
    dialog = screen.getByRole('dialog');
    expect(dialog.getAttribute('aria-labelledby')).toBe('modal-primary-id');
    unmount2();

    // 3. slotProps.paper aria-labelledby can override default generated title ID for visible title
    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Title Fallback Modal"
          closeModal={jest.fn()}
          slotProps={{
            paper: {
              'aria-labelledby': 'custom-paper-title-id',
              'aria-describedby': 'custom-paper-desc-id'
            } as PaperProps
          }}
        >
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );
    dialog = screen.getByRole('dialog');
    const title = screen.getByTestId('modal-title');
    expect(dialog.getAttribute('aria-labelledby')).toBe('custom-paper-title-id');
    expect(dialog.getAttribute('aria-labelledby')).not.toBe(title.getAttribute('id'));
    expect(dialog.getAttribute('aria-describedby')).toBe('custom-paper-desc-id');
  });

  it('treats empty or whitespace-only title as absent and fails closed when nameless', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <SistentThemeProvider>
        <Modal open title="   " closeModal={jest.fn()}>
          <div>Nameless content</div>
        </Modal>
      </SistentThemeProvider>
    );

    // Dialog fails closed to prevent rendering an open, unnamed dialog
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(screen.queryByTestId('modal-title')).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Modal: Dialog is rendered without an accessible name')
    );
    warnSpy.mockRestore();
  });

  it('preserves valid explicit aria-label or aria-labelledby when visible title is blank', () => {
    const { unmount } = render(
      <SistentThemeProvider>
        <Modal open title="   " aria-label="Settings configuration" closeModal={jest.fn()}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    let dialog = screen.getByRole('dialog', { name: 'Settings configuration' });
    expect(dialog).toBeTruthy();
    expect(screen.queryByTestId('modal-title')).toBeNull();
    unmount();

    render(
      <SistentThemeProvider>
        <h2 id="external-heading-id">Account Settings</h2>
        <Modal open title="   " aria-labelledby="external-heading-id" closeModal={jest.fn()}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    dialog = screen.getByRole('dialog', { name: 'Account Settings' });
    expect(dialog).toBeTruthy();
    expect(screen.queryByTestId('modal-title')).toBeNull();
  });

  it('preserves object-valued and callback-valued slotProps.paper properties alongside accessibility attributes', () => {
    // (a) object-valued
    const { unmount } = render(
      <SistentThemeProvider>
        <Modal
          open
          title="Customized Paper Modal"
          closeModal={jest.fn()}
          slotProps={{
            paper: {
              className: 'custom-paper-classname',
              'data-testid': 'customized-paper-slot',
              elevation: 8
            } as PaperProps & { 'data-testid'?: string }
          }}
        >
          <div>Custom paper content</div>
        </Modal>
      </SistentThemeProvider>
    );

    let dialog = screen.getByRole('dialog');
    expect(dialog.classList.contains('custom-paper-classname')).toBe(true);
    expect(dialog.getAttribute('data-testid')).toBe('customized-paper-slot');
    unmount();

    // (b) callback-valued
    const paperCallback = jest.fn((ownerState: DialogOwnerState) => ({
      className: `dynamic-paper-${ownerState.fullWidth ? 'full' : 'fixed'}`,
      'data-testid': 'callback-paper-slot'
    }));

    render(
      <SistentThemeProvider>
        <Modal
          open
          title="Callback Paper Modal"
          closeModal={jest.fn()}
          slotProps={{ paper: paperCallback }}
        >
          <div>Callback content</div>
        </Modal>
      </SistentThemeProvider>
    );

    dialog = screen.getByRole('dialog');
    expect(paperCallback).toHaveBeenCalled();
    expect(dialog.getAttribute('data-testid')).toBe('callback-paper-slot');
    expect(dialog.classList.contains('dynamic-paper-full')).toBe(true);
  });

  describe('useModal helper', () => {
    it('opens modal with valid title and wires aria-labelledby to rendered header', () => {
      const Harness = () => {
        const modal = useModal({ headerIcon: null });
        return (
          <div>
            <button onClick={() => modal.openModal({ title: 'Dynamic Title' })}>Open</button>
            <Modal {...modal}>
              <div>Content</div>
            </Modal>
          </div>
        );
      };

      render(
        <SistentThemeProvider>
          <Harness />
        </SistentThemeProvider>
      );

      expect(screen.queryByRole('dialog')).toBeNull();
      fireEvent.click(screen.getByText('Open'));

      const dialog = screen.getByRole('dialog', { name: 'Dynamic Title' });
      const title = screen.getByTestId('modal-title');
      expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
      expect(title.textContent).toBe('Dynamic Title');
    });

    it('rejects invalid title requests and prevents opening an unnamed dialog', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const Harness = () => {
        const modal = useModal({ headerIcon: null });
        return (
          <div>
            <button onClick={() => modal.openModal({ title: '   ' })}>Open Blank</button>
            <button onClick={() => modal.openModal({ title: '' })}>Open Empty</button>
            <button onClick={() => modal.openModal({ title: undefined as unknown as string })}>
              Open Undefined
            </button>
            <span data-testid="is-open">{String(modal.open)}</span>
            <Modal {...modal}>
              <div>Content</div>
            </Modal>
          </div>
        );
      };

      render(
        <SistentThemeProvider>
          <Harness />
        </SistentThemeProvider>
      );

      fireEvent.click(screen.getByText('Open Blank'));
      expect(screen.getByTestId('is-open').textContent).toBe('false');
      expect(screen.queryByRole('dialog')).toBeNull();

      fireEvent.click(screen.getByText('Open Empty'));
      expect(screen.getByTestId('is-open').textContent).toBe('false');
      expect(screen.queryByRole('dialog')).toBeNull();

      fireEvent.click(screen.getByText('Open Undefined'));
      expect(screen.getByTestId('is-open').textContent).toBe('false');
      expect(screen.queryByRole('dialog')).toBeNull();

      expect(warnSpy).toHaveBeenCalledTimes(3);
      warnSpy.mockRestore();
    });

    it('preserves previous valid modal state if an invalid request occurs while open', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const Harness = () => {
        const modal = useModal({ headerIcon: null });
        return (
          <div>
            <button
              onClick={() =>
                modal.openModal({
                  title: 'Valid Title',
                  reactNode: <div data-testid="valid-node">Valid Node</div>
                })
              }
            >
              Open Valid
            </button>
            <button
              onClick={() =>
                modal.openModal({
                  title: '   ',
                  reactNode: <div data-testid="invalid-node">Invalid Node</div>
                })
              }
            >
              Attempt Invalid
            </button>
            <Modal {...modal} />
          </div>
        );
      };

      render(
        <SistentThemeProvider>
          <Harness />
        </SistentThemeProvider>
      );

      fireEvent.click(screen.getByText('Open Valid'));
      expect(screen.getByRole('dialog', { name: 'Valid Title' })).toBeTruthy();
      expect(screen.getByTestId('valid-node')).toBeTruthy();

      // Subsequent invalid request is rejected and preserves valid state
      fireEvent.click(screen.getByText('Attempt Invalid'));
      expect(screen.getByRole('dialog', { name: 'Valid Title' })).toBeTruthy();
      expect(screen.getByTestId('valid-node')).toBeTruthy();
      expect(screen.queryByTestId('invalid-node')).toBeNull();

      expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('useModal: openModal rejected'));
      warnSpy.mockRestore();
    });

    it('handles close and subsequent open with a new title cleanly, invoking onClose', () => {
      const onClose = jest.fn();

      const Harness = () => {
        const modal = useModal({ headerIcon: null });
        return (
          <div>
            <button onClick={() => modal.openModal({ title: 'First Session', onClose })}>
              Open First
            </button>
            <button onClick={() => modal.openModal({ title: 'Second Session' })}>
              Open Second
            </button>
            <button onClick={modal.closeModal}>Close</button>
            <span data-testid="open-state">{String(modal.open)}</span>
            <span data-testid="title-state">{modal.title}</span>
            {modal.open && (
              <Modal {...modal}>
                <div>Content</div>
              </Modal>
            )}
          </div>
        );
      };

      render(
        <SistentThemeProvider>
          <Harness />
        </SistentThemeProvider>
      );

      fireEvent.click(screen.getByText('Open First'));
      expect(screen.getByRole('dialog', { name: 'First Session' })).toBeTruthy();

      fireEvent.click(screen.getByText('Close'));
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('open-state').textContent).toBe('false');
      expect(screen.getByTestId('title-state').textContent).toBe('');
      expect(screen.queryByRole('dialog')).toBeNull();

      fireEvent.click(screen.getByText('Open Second'));
      expect(screen.getByRole('dialog', { name: 'Second Session' })).toBeTruthy();
    });
  });

  it('triggers closeModal from close button and toggles fullscreen state', () => {
    const closeModal = jest.fn();

    render(
      <SistentThemeProvider>
        <Modal open title="Controls Modal" isFullScreenModeAllowed closeModal={closeModal}>
          <div>Content</div>
        </Modal>
      </SistentThemeProvider>
    );

    const closeBtn = screen.getByTestId('modal-close-btn');
    fireEvent.click(closeBtn);
    expect(closeModal).toHaveBeenCalledTimes(1);

    const enterBtn = screen.getByTestId('modal-enter-fullscreen-btn');
    fireEvent.click(enterBtn);
    expect(screen.getByTestId('modal-exit-fullscreen-btn')).toBeTruthy();

    const exitBtn = screen.getByTestId('modal-exit-fullscreen-btn');
    fireEvent.click(exitBtn);
    expect(screen.getByTestId('modal-enter-fullscreen-btn')).toBeTruthy();
  });
});
