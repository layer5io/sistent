import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

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

import { BulkActionToolbar } from '../custom/BulkActionToolbar';
import { SistentThemeProviderWithoutBaseLine } from '../theme';

function renderWithTheme(ui: React.ReactElement) {
  return render(<SistentThemeProviderWithoutBaseLine>{ui}</SistentThemeProviderWithoutBaseLine>);
}

describe('BulkActionToolbar', () => {
  it('renders null when selectedCount is 0', () => {
    const { container } = renderWithTheme(<BulkActionToolbar selectedCount={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders selected count and children when selectedCount > 0', () => {
    renderWithTheme(
      <BulkActionToolbar selectedCount={3}>
        <button data-testid="custom-action">Delete</button>
      </BulkActionToolbar>
    );

    expect(screen.getByText('3 selected')).toBeTruthy();
    expect(screen.getByTestId('custom-action')).toBeTruthy();
  });

  it('renders deselect button and handles callback', () => {
    const onDeselectAll = jest.fn();
    renderWithTheme(<BulkActionToolbar selectedCount={5} onDeselectAll={onDeselectAll} />);

    const deselectButton = screen.getByTestId('deselect-all-button');
    expect(deselectButton).toBeTruthy();

    fireEvent.click(deselectButton);
    expect(onDeselectAll).toHaveBeenCalledTimes(1);
  });

  it('renders custom labels when provided', () => {
    renderWithTheme(
      <BulkActionToolbar
        selectedCount={3}
        onDeselectAll={jest.fn()}
        deselectAllLabel="Clear Selection"
        selectedLabel="items chosen"
      />
    );

    expect(screen.getByText('3 items chosen')).toBeTruthy();
  });
});
