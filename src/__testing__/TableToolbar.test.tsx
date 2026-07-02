import { render, screen } from '@testing-library/react';
import React from 'react';
import { TableToolbar } from '../custom/TableToolbar/TableToolbar';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('TableToolbar', () => {
  it('renders composable leading, center, and end slots', () => {
    renderWithTheme(
      <TableToolbar
        leadingContent={<button type="button">Create</button>}
        centerContent={<div>Search and filters</div>}
        endContent={<div>View controls</div>}
      />
    );

    expect(screen.getByRole('toolbar', { name: 'Table toolbar' })).toBeTruthy();
    expect(screen.getByText('Create')).toBeTruthy();
    expect(screen.getByText('Search and filters')).toBeTruthy();
    expect(screen.getByText('View controls')).toBeTruthy();
  });

  it('omits empty slot wrappers when content is not provided', () => {
    renderWithTheme(<TableToolbar endContent={<div>Tools</div>} />);

    expect(screen.queryByTestId('table-toolbar-leading')).toBeNull();
    expect(screen.queryByTestId('table-toolbar-center')).toBeNull();
    expect(screen.getByTestId('table-toolbar-end')).toBeTruthy();
  });

  it('supports a custom aria-label', () => {
    renderWithTheme(<TableToolbar ariaLabel="Custom toolbar label" />);

    expect(screen.getByRole('toolbar', { name: 'Custom toolbar label' })).toBeTruthy();
  });
});
