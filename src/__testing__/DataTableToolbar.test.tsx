import { render, screen } from '@testing-library/react';
import React from 'react';

import { DataTableToolbar } from '../custom/DataTableToolbar';
import { SistentThemeProvider } from '../theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('DataTableToolbar', () => {
  it('renders primaryActions content', () => {
    renderWithTheme(<DataTableToolbar primaryActions={<button>Add</button>} />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeTruthy();
  });

  it('renders secondaryActions content', () => {
    renderWithTheme(<DataTableToolbar secondaryActions={<button>Export</button>} />);
    expect(screen.getByRole('button', { name: 'Export' })).toBeTruthy();
  });

  it('renders search slot', () => {
    renderWithTheme(<DataTableToolbar search={<input placeholder="Search" />} />);
    expect(screen.getByPlaceholderText('Search')).toBeTruthy();
  });

  it('renders filter slot', () => {
    renderWithTheme(<DataTableToolbar filter={<div>Filter</div>} />);
    expect(screen.getByText('Filter')).toBeTruthy();
  });

  it('renders columnVisibility slot', () => {
    renderWithTheme(<DataTableToolbar columnVisibility={<div>Columns</div>} />);
    expect(screen.getByText('Columns')).toBeTruthy();
  });

  it('renders viewSwitch slot', () => {
    renderWithTheme(<DataTableToolbar viewSwitch={<div>Grid/Table</div>} />);
    expect(screen.getByText('Grid/Table')).toBeTruthy();
  });

  it('renders all slots simultaneously', () => {
    renderWithTheme(
      <DataTableToolbar
        primaryActions={<button>Add</button>}
        search={<input placeholder="Search" />}
        filter={<div>Filter</div>}
      />
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeTruthy();
    expect(screen.getByPlaceholderText('Search')).toBeTruthy();
    expect(screen.getByText('Filter')).toBeTruthy();
  });

  it('renders without any props (empty state)', () => {
    const { container } = renderWithTheme(<DataTableToolbar />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies custom sx styles', () => {
    const { container } = renderWithTheme(<DataTableToolbar sx={{ marginTop: '32px' }} />);
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle('margin-top: 32px');
  });
});
