import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import {
  DangerConfirmationModal,
  type DangerConfirmationModalProps
} from '../custom/DangerConfirmationModal';
import { SistentThemeProvider } from '../theme';

// The Modal primitives transitively import CustomTooltip -> Markdown ->
// react-markdown (ESM-only). Jest's transformIgnorePatterns allowlist excludes
// the markdown ESM tree, so those leaf modules are stubbed here (this suite
// never exercises markdown rendering). Mirrors CatalogFilterSection.test.tsx.
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

const renderModal = (props: Partial<DangerConfirmationModalProps> = {}) => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const utils = render(
    <SistentThemeProvider>
      <DangerConfirmationModal
        open
        title="Delete organization"
        description="This action cannot be undone."
        onConfirm={onConfirm}
        onCancel={onCancel}
        {...props}
      />
    </SistentThemeProvider>
  );
  return { onConfirm, onCancel, ...utils };
};

const getConfirmButton = () =>
  screen.getByTestId('danger-confirmation-confirm') as HTMLButtonElement;

describe('DangerConfirmationModal', () => {
  it('enables confirm only after the single required checkbox is ticked, then fires onConfirm', () => {
    const { onConfirm } = renderModal({
      checkboxes: [{ id: 'ack', label: 'I understand this is permanent.' }]
    });

    const confirm = getConfirmButton();
    expect(confirm.disabled).toBe(true);

    fireEvent.click(screen.getByRole('checkbox', { name: /permanent/i }));
    expect(confirm.disabled).toBe(false);

    fireEvent.click(confirm);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('keeps confirm disabled until the confirmation phrase matches exactly', () => {
    renderModal({ confirmationPhrase: 'Acme Corp' });

    const confirm = getConfirmButton();
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(confirm.disabled).toBe(true);

    fireEvent.change(input, { target: { value: 'Acme' } });
    expect(confirm.disabled).toBe(true);

    // Case-sensitive: a near-miss must not unlock the action.
    fireEvent.change(input, { target: { value: 'acme corp' } });
    expect(confirm.disabled).toBe(true);

    fireEvent.change(input, { target: { value: 'Acme Corp' } });
    expect(confirm.disabled).toBe(false);
  });

  it('requires the phrase AND every required checkbox before enabling confirm', () => {
    renderModal({
      confirmationPhrase: 'Acme Corp',
      checkboxes: [
        { id: 'ack', label: 'I understand this is permanent.' },
        { id: 'shared', label: 'I understand shared resources will be destroyed.' }
      ]
    });

    const confirm = getConfirmButton();

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Acme Corp' } });
    expect(confirm.disabled).toBe(true);

    fireEvent.click(screen.getByRole('checkbox', { name: /permanent/i }));
    expect(confirm.disabled).toBe(true);

    fireEvent.click(screen.getByRole('checkbox', { name: /shared resources/i }));
    expect(confirm.disabled).toBe(false);
  });

  it('does not gate on a checkbox marked required: false', () => {
    renderModal({
      checkboxes: [{ id: 'optional', label: 'Email me a copy of the audit log.', required: false }]
    });

    expect(getConfirmButton().disabled).toBe(false);
  });

  it('honors defaultChecked so a pre-ticked required checkbox enables confirm immediately', () => {
    renderModal({
      checkboxes: [{ id: 'ack', label: 'I understand this is permanent.', defaultChecked: true }]
    });

    expect(getConfirmButton().disabled).toBe(false);
  });

  it('fires onCancel from the Cancel button', () => {
    const { onCancel } = renderModal();

    fireEvent.click(screen.getByTestId('danger-confirmation-cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('renders the recommended-alternative callout only when provided', () => {
    const { rerender } = renderModal();
    expect(screen.queryByTestId('danger-confirmation-recommended-alternative')).toBeNull();

    rerender(
      <SistentThemeProvider>
        <DangerConfirmationModal
          open
          title="Delete organization"
          description="This action cannot be undone."
          recommendedAlternative={<span>Transfer ownership instead.</span>}
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />
      </SistentThemeProvider>
    );
    expect(screen.getByTestId('danger-confirmation-recommended-alternative')).not.toBeNull();
    expect(screen.getByText('Transfer ownership instead.')).not.toBeNull();
  });

  it('blocks the primary action and dismissal while a destructive request is in flight', () => {
    const { onCancel } = renderModal({ isConfirming: true });

    expect(getConfirmButton().disabled).toBe(true);
    expect((screen.getByTestId('danger-confirmation-cancel') as HTMLButtonElement).disabled).toBe(
      true
    );

    fireEvent.click(screen.getByTestId('danger-confirmation-cancel'));
    expect(onCancel).not.toHaveBeenCalled();
  });

  it('resets the typed phrase each time the modal reopens', () => {
    const stableCheckboxes = [{ id: 'ack', label: 'I understand this is permanent.' }];
    const ui = (open: boolean) => (
      <SistentThemeProvider>
        <DangerConfirmationModal
          open={open}
          title="Delete organization"
          description="This action cannot be undone."
          confirmationPhrase="Acme Corp"
          checkboxes={stableCheckboxes}
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />
      </SistentThemeProvider>
    );

    const { rerender } = render(ui(true));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Acme Corp' } });
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('Acme Corp');

    rerender(ui(false));
    rerender(ui(true));

    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('');
    expect(getConfirmButton().disabled).toBe(true);
  });
});
