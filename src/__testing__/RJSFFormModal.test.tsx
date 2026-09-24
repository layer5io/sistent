/**
 * Tests for RJSFFormModal lifecycle, error handling, and form submission.
 */

import type { RJSFSchema } from '@rjsf/utils';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { RJSFFormModal } from '../custom/RJSFFormWrapper/RJSFFormModal';
import { SistentThemeProvider } from '../theme';

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <span>{children}</span>
}));
jest.mock('remark-gfm', () => ({
  __esModule: true,
  default: () => () => {}
}));
jest.mock('rehype-raw', () => ({
  __esModule: true,
  default: () => () => {}
}));

function Wrap({ children }: { children: React.ReactNode }) {
  return <SistentThemeProvider>{children}</SistentThemeProvider>;
}

describe('RJSFFormModal lifecycle and validation behavior', () => {
  const modalSchema: RJSFSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      name: { type: 'string', title: 'Name' },
      email: { type: 'string', title: 'Email' }
    }
  };

  it('renders modal title and form fields when open is true', () => {
    render(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={() => {}}
          onSubmit={() => {}}
          schema={modalSchema}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    expect(screen.getByText('Create Workspace')).toBeDefined();
    expect(screen.getByLabelText(/Name/i)).toBeDefined();
    expect(screen.getByRole('button', { name: 'Create' })).toBeDefined();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDefined();
  });

  it('clears previous validation errors when modal closes and reopens', () => {
    const onValidationError = jest.fn();
    const onSubmit = jest.fn();

    const { rerender } = render(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={() => {}}
          onSubmit={onSubmit}
          onValidationError={onValidationError}
          schema={modalSchema}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    // Attempt submit on empty required field to trigger validation failure
    const createBtn = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createBtn);
    expect(onValidationError).toHaveBeenCalledTimes(1);

    // Errors should be present in the modal body (alert list and field helper text)
    expect(screen.getAllByText(/must have required property 'name'/i).length).toBeGreaterThan(0);

    // Close modal
    rerender(
      <Wrap>
        <RJSFFormModal
          open={false}
          onClose={() => {}}
          onSubmit={onSubmit}
          onValidationError={onValidationError}
          schema={modalSchema}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    // Reopen modal
    rerender(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={() => {}}
          onSubmit={onSubmit}
          onValidationError={onValidationError}
          schema={modalSchema}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    // Lingering validation errors from previous submit attempt must be cleared
    expect(screen.queryByText(/must have required property 'name'/i)).toBeNull();
  });

  it('submits valid form data and triggers onClose on successful submission', () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    render(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={onClose}
          onSubmit={onSubmit}
          initialData={{ name: 'Engineering' }}
          schema={modalSchema}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    const createBtn = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createBtn);

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Engineering' });
    expect(onClose).toHaveBeenCalled();
  });

  it('excludes unrecognized extra data when omitExtraData is enabled', () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();

    render(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={onClose}
          onSubmit={onSubmit}
          initialData={{ name: 'Engineering', extraneousField: 'should-be-omitted' }}
          schema={modalSchema}
          omitExtraData={true}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    const createBtn = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createBtn);

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Engineering' });
    expect(onClose).toHaveBeenCalled();
  });

  it('submits invalid form without validation errors when noValidate is enabled', () => {
    const onSubmit = jest.fn();
    const onClose = jest.fn();
    const onValidationError = jest.fn();

    render(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={onClose}
          onSubmit={onSubmit}
          onValidationError={onValidationError}
          schema={modalSchema}
          noValidate={true}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    const createBtn = screen.getByRole('button', { name: 'Create' });
    fireEvent.click(createBtn);

    expect(onValidationError).not.toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('preserves user-entered form data when parent re-renders with a new initialData object reference while open', () => {
    const { rerender } = render(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={() => {}}
          onSubmit={() => {}}
          initialData={{ name: 'Initial Name' }}
          schema={modalSchema}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    const input = screen.getByRole('textbox', { name: /Name/i });
    expect((input as HTMLInputElement).value).toBe('Initial Name');

    // Simulate user editing the field
    fireEvent.change(input, { target: { value: 'User Edited Name' } });
    expect((input as HTMLInputElement).value).toBe('User Edited Name');

    // Parent re-renders with a new object reference for initialData
    rerender(
      <Wrap>
        <RJSFFormModal
          open={true}
          onClose={() => {}}
          onSubmit={() => {}}
          initialData={{ name: 'Initial Name' }}
          schema={modalSchema}
          title="Create Workspace"
          buttonTitle="Create"
        />
      </Wrap>
    );

    // User's edited data must NOT be overwritten
    expect((input as HTMLInputElement).value).toBe('User Edited Name');
  });
});
