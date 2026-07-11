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

  it('renders bulkOperations content in right section', () => {
    renderWithTheme(<DataTableToolbar bulkOperations={<button>Select All</button>} />);
    expect(screen.getByRole('button', { name: 'Select All' })).toBeTruthy();
  });

  it('renders all slots simultaneously with bulkOperations', () => {
    renderWithTheme(
      <DataTableToolbar
        primaryActions={<button>Add</button>}
        secondaryActions={<button>Export</button>}
        bulkOperations={<button>Select All</button>}
        search={<input placeholder="Search" />}
        filter={<div>Filter</div>}
      />
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Export' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Select All' })).toBeTruthy();
    expect(screen.getByPlaceholderText('Search')).toBeTruthy();
    expect(screen.getByText('Filter')).toBeTruthy();
  });

  it('renders search before filter in DOM order', () => {
    const { container } = renderWithTheme(
      <DataTableToolbar
        search={<span data-testid="search">Search</span>}
        filter={<span data-testid="filter">Filter</span>}
      />
    );
    const children = container.querySelectorAll('[data-testid="search"], [data-testid="filter"]');
    expect(children.length).toBe(2);
    expect(children[0].getAttribute('data-testid')).toBe('search');
    expect(children[1].getAttribute('data-testid')).toBe('filter');
  });

  it('renders without any props (empty state)', () => {
    const { container } = renderWithTheme(<DataTableToolbar />);
    expect(container.firstChild).toBeTruthy();
  });

  it('applies custom sx styles', () => {
    const { container } = renderWithTheme(<DataTableToolbar sx={{ marginTop: '32px' }} />);
    const root = container.firstChild as HTMLElement;
    expect(window.getComputedStyle(root).marginTop).toBe('32px');
  });

  it('renders searchHelperText when provided', () => {
    renderWithTheme(
      <DataTableToolbar searchHelperText="Search by name, kind, category" />
    );
    expect(screen.getByText('Search by name, kind, category')).toBeTruthy();
  });

  it('renders tabs content when provided', () => {
    renderWithTheme(
      <DataTableToolbar tabs={<div>Tab Content</div>} />
    );
    expect(screen.getByText('Tab Content')).toBeTruthy();
  });

  it('renders both searchHelperText and tabs together', () => {
    renderWithTheme(
      <DataTableToolbar
        searchHelperText="Search items"
        tabs={<div>My Tabs</div>}
      />
    );
    expect(screen.getByText('Search items')).toBeTruthy();
    expect(screen.getByText('My Tabs')).toBeTruthy();
  });

  describe('layout positioning', () => {
    it('pushes right section to the right when only right content is present', () => {
      renderWithTheme(<DataTableToolbar search={<span data-testid="right-content">Search</span>} />);
      const rightContent = screen.getByTestId('right-content');
      const rightSection = rightContent.parentElement as HTMLElement;
      // RightSection has marginLeft: auto — check via computed style
      expect(rightSection).toBeTruthy();
      expect(window.getComputedStyle(rightSection).marginLeft).toBe('auto');
    });

    it('keeps left content on the left when only left content is present', () => {
      renderWithTheme(<DataTableToolbar primaryActions={<button data-testid="left-content">Add</button>} />);
      const leftContent = screen.getByTestId('left-content');
      const leftSection = leftContent.parentElement as HTMLElement;
      // Default Section has no marginLeft override
      expect(leftSection).toBeTruthy();
      expect(window.getComputedStyle(leftSection).marginLeft).not.toBe('auto');
    });

    it('separates left and right content to opposite ends when both are present', () => {
      renderWithTheme(
        <DataTableToolbar
          primaryActions={<button data-testid="left-btn">Add</button>}
          search={<span data-testid="right-content">Search</span>}
        />
      );
      const leftContent = screen.getByTestId('left-btn');
      const rightContent = screen.getByTestId('right-content');
      const leftSection = leftContent.parentElement as HTMLElement;
      const rightSection = rightContent.parentElement as HTMLElement;

      expect(leftSection).toBeTruthy();
      expect(rightSection).toBeTruthy();
      // Left section has no auto margin
      expect(window.getComputedStyle(leftSection).marginLeft).not.toBe('auto');
      // Right section has auto margin to push it right
      expect(window.getComputedStyle(rightSection).marginLeft).toBe('auto');
    });
  });
});
