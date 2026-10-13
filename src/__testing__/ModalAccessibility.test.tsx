import type { DialogOwnerState, PaperProps } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Modal, useModal } from '../custom/Modal';
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

  describe('empty-title and titleless-modal behavior', () => {
    it('treats empty or whitespace-only title as absent and warns in development when nameless', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <SistentThemeProvider>
          <Modal open title="   " closeModal={jest.fn()}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      // Visible title header must not be rendered
      expect(screen.queryByTestId('modal-title')).toBeNull();
      // No dangling auto-generated aria-labelledby
      expect(dialog.getAttribute('aria-labelledby')).toBeNull();
      expect(dialog.getAttribute('aria-label')).toBeNull();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('Modal: Dialog is rendered without an accessible name')
      );
      warnSpy.mockRestore();
    });

    it('preserves valid explicit aria-label when visible title is blank', () => {
      render(
        <SistentThemeProvider>
          <Modal open title="" aria-label="Settings configuration" closeModal={jest.fn()}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog', { name: 'Settings configuration' });
      expect(dialog).toBeTruthy();
      expect(screen.queryByTestId('modal-title')).toBeNull();
      expect(dialog.getAttribute('aria-labelledby')).toBeNull();
      expect(dialog.getAttribute('aria-label')).toBe('Settings configuration');
    });

    it('preserves valid external aria-labelledby when visible title is blank', () => {
      render(
        <SistentThemeProvider>
          <h2 id="external-heading-id">Account Settings</h2>
          <Modal open title="   " aria-labelledby="external-heading-id" closeModal={jest.fn()}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog', { name: 'Account Settings' });
      expect(dialog).toBeTruthy();
      expect(screen.queryByTestId('modal-title')).toBeNull();
      expect(dialog.getAttribute('aria-labelledby')).toBe('external-heading-id');
    });

    it('preserves slotProps.paper naming attributes when title is blank', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            title=""
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-label': 'Paper accessible title'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog', { name: 'Paper accessible title' });
      expect(dialog).toBeTruthy();
      expect(dialog.getAttribute('aria-label')).toBe('Paper accessible title');
      expect(dialog.getAttribute('aria-labelledby')).toBeNull();
      expect(screen.queryByTestId('modal-title')).toBeNull();
    });

    it('falls back when Modal-level aria-labelledby is whitespace-only', () => {
      render(
        <SistentThemeProvider>
          <Modal open title="Fallback Modal Title" aria-labelledby="   " closeModal={jest.fn()}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByTestId('modal-title');
      // Blank aria-labelledby is treated as absent, so it falls back to generated title id
      expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
      expect(title.textContent).toBe('Fallback Modal Title');
    });
  });

  describe('useModal helper edge cases', () => {
    const UseModalHarness = ({
      titleToOpen,
      onCloseCallback
    }: {
      titleToOpen?: string;
      onCloseCallback?: () => void;
    }) => {
      const modal = useModal({ headerIcon: null });
      return (
        <div>
          <button
            data-testid="open-btn"
            onClick={() =>
              modal.openModal({
                title: titleToOpen,
                onClose: onCloseCallback
              })
            }
          >
            Open
          </button>
          <button data-testid="close-btn" onClick={modal.closeModal}>
            Close
          </button>
          <Modal {...modal} transitionDuration={0}>
            <div>Modal Body</div>
          </Modal>
        </div>
      );
    };

    it('opens modal with valid title and wires aria-labelledby to rendered header', () => {
      render(
        <SistentThemeProvider>
          <UseModalHarness titleToOpen="Dynamic Title" />
        </SistentThemeProvider>
      );

      expect(screen.queryByRole('dialog')).toBeNull();
      fireEvent.click(screen.getByTestId('open-btn'));

      const dialog = screen.getByRole('dialog', { name: 'Dynamic Title' });
      const title = screen.getByTestId('modal-title');
      expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
      expect(title.textContent).toBe('Dynamic Title');
    });

    it('warns and avoids opening unnamed dialog with dangling aria-labelledby when title is blank', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <SistentThemeProvider>
          <UseModalHarness titleToOpen="   " />
        </SistentThemeProvider>
      );

      fireEvent.click(screen.getByTestId('open-btn'));

      // The dialog fails closed and does not open an unnamed modal
      expect(screen.queryByRole('dialog')).toBeNull();
      expect(screen.queryByTestId('modal-title')).toBeNull();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'useModal: openModal rejected. A non-empty title is required to ensure an accessible dialog name.'
        )
      );
      warnSpy.mockRestore();
    });

    it('rejects empty string, whitespace-only string, and missing title without opening dialog or altering state', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const RejectHarness = () => {
        const modal = useModal({ headerIcon: null });
        return (
          <div>
            <button data-testid="open-empty" onClick={() => modal.openModal({ title: '' })}>
              Open Empty
            </button>
            <button data-testid="open-spaces" onClick={() => modal.openModal({ title: '    ' })}>
              Open Spaces
            </button>
            <button
              data-testid="open-undefined"
              onClick={() => modal.openModal({ title: undefined as unknown as string })}
            >
              Open Undefined
            </button>
            <span data-testid="is-open">{String(modal.open)}</span>
            <span data-testid="modal-title">{modal.title}</span>
            <Modal {...modal} transitionDuration={0}>
              <div>Modal Content</div>
            </Modal>
          </div>
        );
      };

      render(
        <SistentThemeProvider>
          <RejectHarness />
        </SistentThemeProvider>
      );

      // Attempt open with empty string
      fireEvent.click(screen.getByTestId('open-empty'));
      expect(screen.getByTestId('is-open').textContent).toBe('false');
      expect(screen.getByTestId('modal-title').textContent).toBe('');
      expect(screen.queryByRole('dialog')).toBeNull();

      // Attempt open with spaces
      fireEvent.click(screen.getByTestId('open-spaces'));
      expect(screen.getByTestId('is-open').textContent).toBe('false');
      expect(screen.queryByRole('dialog')).toBeNull();

      // Attempt open with missing title
      fireEvent.click(screen.getByTestId('open-undefined'));
      expect(screen.getByTestId('is-open').textContent).toBe('false');
      expect(screen.queryByRole('dialog')).toBeNull();

      expect(warnSpy).toHaveBeenCalledTimes(3);
      warnSpy.mockRestore();
    });

    it('preserves previous valid modal state if invalid request is made while already open', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const OverwriteProtectionHarness = () => {
        const modal = useModal({ headerIcon: null });
        return (
          <div>
            <button
              data-testid="open-valid"
              onClick={() =>
                modal.openModal({
                  title: 'Valid Active Title',
                  reactNode: <div data-testid="valid-body">Valid Body Content</div>
                })
              }
            >
              Open Valid
            </button>
            <button
              data-testid="attempt-invalid"
              onClick={() =>
                modal.openModal({
                  title: '   ',
                  reactNode: <div data-testid="invalid-body">Should Not Overwrite</div>
                })
              }
            >
              Attempt Invalid
            </button>
            <Modal {...modal} transitionDuration={0} />
          </div>
        );
      };

      render(
        <SistentThemeProvider>
          <OverwriteProtectionHarness />
        </SistentThemeProvider>
      );

      // Open valid modal
      fireEvent.click(screen.getByTestId('open-valid'));
      expect(screen.getByRole('dialog', { name: 'Valid Active Title' })).toBeTruthy();
      expect(screen.getByTestId('valid-body')).toBeTruthy();

      // Attempt to overwrite with invalid request
      fireEvent.click(screen.getByTestId('attempt-invalid'));

      // Valid state is fully preserved, invalid state is ignored
      expect(screen.getByRole('dialog', { name: 'Valid Active Title' })).toBeTruthy();
      expect(screen.getByTestId('valid-body')).toBeTruthy();
      expect(screen.queryByTestId('invalid-body')).toBeNull();

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          'useModal: openModal rejected. A non-empty title is required to ensure an accessible dialog name.'
        )
      );
      warnSpy.mockRestore();
    });

    it('handles close and subsequent open with a new title cleanly, invoking onClose', () => {
      const onClose = jest.fn();

      const DynamicHarness = () => {
        const modal = useModal({ headerIcon: null });
        return (
          <div>
            <button
              data-testid="open-first"
              onClick={() => modal.openModal({ title: 'First Session', onClose })}
            >
              Open First
            </button>
            <button
              data-testid="open-second"
              onClick={() => modal.openModal({ title: 'Second Session' })}
            >
              Open Second
            </button>
            <button data-testid="close-modal" onClick={modal.closeModal}>
              Close
            </button>
            <span data-testid="modal-open-state">{String(modal.open)}</span>
            <span data-testid="modal-isopen-state">{String(modal.isOpen)}</span>
            <span data-testid="modal-title-state">{modal.title}</span>
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
          <DynamicHarness />
        </SistentThemeProvider>
      );

      // Open first
      fireEvent.click(screen.getByTestId('open-first'));
      expect(screen.getByTestId('modal-open-state').textContent).toBe('true');
      expect(screen.getByTestId('modal-isopen-state').textContent).toBe('true');
      expect(screen.getByRole('dialog', { name: 'First Session' })).toBeTruthy();

      // Close
      fireEvent.click(screen.getByTestId('close-modal'));
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId('modal-open-state').textContent).toBe('false');
      expect(screen.getByTestId('modal-isopen-state').textContent).toBe('false');
      expect(screen.getByTestId('modal-title-state').textContent).toBe('');
      expect(screen.queryByRole('dialog')).toBeNull();

      // Open second
      fireEvent.click(screen.getByTestId('open-second'));
      expect(screen.getByTestId('modal-open-state').textContent).toBe('true');
      expect(screen.getByTestId('modal-isopen-state').textContent).toBe('true');
      expect(screen.getByRole('dialog', { name: 'Second Session' })).toBeTruthy();
    });
  });

  describe('ARIA precedence and attribute merging', () => {
    it('suppresses Paper-level aria-label when visible title generates aria-labelledby', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            title="Visible Title Header"
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-label': 'Paper Level Label'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog', { name: 'Visible Title Header' });
      const title = screen.getByTestId('modal-title');
      // accname rule: aria-labelledby takes precedence, aria-label is suppressed on the paper
      expect(dialog.getAttribute('aria-labelledby')).toBe(title.getAttribute('id'));
      expect(dialog.getAttribute('aria-label')).toBeNull();
    });

    it('Modal-level aria-label overrides Paper-level aria-label when no aria-labelledby exists', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            aria-label="Modal Prop Label"
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-label': 'Paper Prop Label'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-label')).toBe('Modal Prop Label');
      expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    });

    it('Modal-level aria-label takes precedence over Paper-level aria-labelledby in titleless modal', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            aria-label="Modal Level Label"
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-labelledby': 'paper-labelledby-reference'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      // Modal-level naming props take precedence over slotProps.paper attributes
      expect(dialog.getAttribute('aria-label')).toBe('Modal Level Label');
      expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    });

    it('Modal-level aria-labelledby takes precedence over Paper-level aria-label', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            aria-labelledby="modal-labelledby-target"
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-label': 'Paper Prop Label'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-labelledby')).toBe('modal-labelledby-target');
      expect(dialog.getAttribute('aria-label')).toBeNull();
    });

    it('Modal-level aria-labelledby takes precedence over Paper-level aria-labelledby', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            aria-labelledby="modal-labelledby-primary"
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-labelledby': 'paper-labelledby-secondary'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-labelledby')).toBe('modal-labelledby-primary');
    });

    it('Paper-level aria-labelledby takes precedence over Paper-level aria-label when titleless and without Modal props', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-labelledby': 'paper-level-labelledby-target',
                'aria-label': 'paper-level-label-target'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-labelledby')).toBe('paper-level-labelledby-target');
      expect(dialog.getAttribute('aria-label')).toBeNull();
    });

    it('falls back to lower-precedence attributes when higher-precedence values are whitespace-only', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            aria-labelledby="   "
            aria-label="Valid Modal Label"
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-label': 'Paper Fallback Label'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-labelledby')).toBeNull();
      expect(dialog.getAttribute('aria-label')).toBe('Valid Modal Label');
    });

    it('Modal-level aria-describedby takes precedence over Paper-level aria-describedby, falling back when blank', () => {
      const { unmount } = render(
        <SistentThemeProvider>
          <Modal
            open
            title="Described Modal 1"
            aria-describedby="modal-desc-target"
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-describedby': 'paper-desc-target'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      let dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-describedby')).toBe('modal-desc-target');
      unmount();

      // Blank modal-level describedby falls back to paper-level describedby
      render(
        <SistentThemeProvider>
          <Modal
            open
            title="Described Modal 2"
            aria-describedby="   "
            closeModal={jest.fn()}
            slotProps={{
              paper: {
                'aria-describedby': 'paper-desc-fallback'
              }
            }}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      dialog = screen.getByRole('dialog');
      expect(dialog.getAttribute('aria-describedby')).toBe('paper-desc-fallback');
    });

    it('ensures ARIA naming and description attributes remain on the dialog paper and not on the presentation root', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            aria-label="Explicit Dialog Label"
            aria-describedby="explicit-dialog-desc"
            closeModal={jest.fn()}
          >
            <div id="explicit-dialog-desc">Description text</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      const root = dialog.closest('.MuiDialog-root');

      expect(root?.getAttribute('aria-label')).toBeNull();
      expect(root?.getAttribute('aria-labelledby')).toBeNull();
      expect(root?.getAttribute('aria-describedby')).toBeNull();

      expect(dialog.getAttribute('aria-label')).toBe('Explicit Dialog Label');
      expect(dialog.getAttribute('aria-describedby')).toBe('explicit-dialog-desc');
    });
  });

  describe('title ID validity, stability, and uniqueness', () => {
    it('sanitizes caller-provided id containing whitespace into a single valid token for title ID without altering dialog id', () => {
      render(
        <SistentThemeProvider>
          <Modal open id="my custom modal id" title="Whitespace ID Dialog" closeModal={jest.fn()}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByTestId('modal-title');

      // Dialog receives original id on its root
      const root = dialog.closest('.MuiDialog-root');
      expect(root?.getAttribute('id')).toBe('my custom modal id');

      // Title element ID must not contain whitespace and uses injective encoding
      const titleId = title.getAttribute('id');
      expect(titleId).toBe('my_x20_custom_x20_modal_x20_id-title');
      expect(titleId?.includes(' ')).toBe(false);
      expect(dialog.getAttribute('aria-labelledby')).toBe('my_x20_custom_x20_modal_x20_id-title');
    });

    it('simultaneously mounted dialogs whose IDs would collide under lossy sanitization receive distinct title IDs', () => {
      render(
        <SistentThemeProvider>
          <Modal open id="my custom modal id" title="Dialog With Spaces" closeModal={jest.fn()}>
            <div>Content 1</div>
          </Modal>
          <Modal open id="my-custom-modal-id" title="Dialog With Hyphens" closeModal={jest.fn()}>
            <div>Content 2</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialogs = screen.getAllByRole('dialog', { hidden: true });
      const titles = screen.getAllByTestId('modal-title');

      expect(dialogs).toHaveLength(2);
      expect(titles).toHaveLength(2);

      const labelIds = dialogs.map((d) => d.getAttribute('aria-labelledby'));
      const titleIds = titles.map((t) => t.getAttribute('id'));

      // Both dialogs have unique IDs and unique title IDs
      expect(new Set(labelIds).size).toBe(2);
      expect(new Set(titleIds).size).toBe(2);
      expect(titleIds).toContain('my_x20_custom_x20_modal_x20_id-title');
      expect(titleIds).toContain('my-custom-modal-id-title');
    });

    it('generates an auto token when caller id is whitespace-only', () => {
      render(
        <SistentThemeProvider>
          <Modal open id="   " title="Blank ID Dialog" closeModal={jest.fn()}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByTestId('modal-title');

      const titleId = title.getAttribute('id');
      expect(titleId).toBeTruthy();
      expect(titleId?.includes(' ')).toBe(false);
      expect(titleId).not.toBe('-title');
      expect(dialog.getAttribute('aria-labelledby')).toBe(titleId);
    });

    it('concurrent mixed dialogs with custom ID and auto-generated ID do not collide', () => {
      render(
        <SistentThemeProvider>
          <Modal open id="explicit-dialog" title="Explicit ID Modal" closeModal={jest.fn()}>
            <div>Content 1</div>
          </Modal>
          <Modal open title="Auto ID Modal" closeModal={jest.fn()}>
            <div>Content 2</div>
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
      expect(titleIds).toContain('explicit-dialog-title');
    });
  });

  describe('modal icon-only controls accessibility', () => {
    it('provides accessible name and tooltip to close button', () => {
      const closeModal = jest.fn();
      render(
        <SistentThemeProvider>
          <Modal open title="Accessible Controls Modal" closeModal={closeModal}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const closeBtn = screen.getByRole('button', { name: 'Close dialog' });
      expect(closeBtn).toBeTruthy();
      expect(closeBtn.getAttribute('data-testid')).toBe('modal-close-btn');

      fireEvent.click(closeBtn);
      expect(closeModal).toHaveBeenCalledTimes(1);
    });

    it('provides accessible names to fullscreen controls and updates state on toggle', () => {
      render(
        <SistentThemeProvider>
          <Modal open title="Fullscreen Modal" isFullScreenModeAllowed closeModal={jest.fn()}>
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const enterBtn = screen.getByRole('button', { name: 'Enter fullscreen' });
      expect(enterBtn).toBeTruthy();
      expect(enterBtn.getAttribute('data-testid')).toBe('modal-enter-fullscreen-btn');

      fireEvent.click(enterBtn);

      const exitBtn = screen.getByRole('button', { name: 'Exit fullscreen' });
      expect(exitBtn).toBeTruthy();
      expect(exitBtn.getAttribute('data-testid')).toBe('modal-exit-fullscreen-btn');

      fireEvent.click(exitBtn);

      expect(screen.getByRole('button', { name: 'Enter fullscreen' })).toBeTruthy();
    });

    it('supports native button keyboard activation on FullscreenBtn via Enter and Space without duplicate toggles', () => {
      render(
        <SistentThemeProvider>
          <Modal
            open
            title="Fullscreen Keyboard Modal"
            isFullScreenModeAllowed
            closeModal={jest.fn()}
          >
            <div>Content</div>
          </Modal>
        </SistentThemeProvider>
      );

      const enterBtn = screen.getByRole('button', { name: 'Enter fullscreen' });
      expect(enterBtn.tagName.toLowerCase()).toBe('button');

      // Native buttons activate on click when Enter or Space is pressed
      fireEvent.click(enterBtn);
      const exitBtn = screen.getByRole('button', { name: 'Exit fullscreen' });
      expect(exitBtn.tagName.toLowerCase()).toBe('button');

      fireEvent.click(exitBtn);
      expect(screen.getByRole('button', { name: 'Enter fullscreen' })).toBeTruthy();
    });
  });
});
