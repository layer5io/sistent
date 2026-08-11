import { render, screen } from '@testing-library/react';
import React from 'react';

import { DataTableToolbar } from '../custom/DataTableToolbar';
import { SistentThemeProvider } from '../theme';

// The toolbar transitively imports CustomTooltip -> Markdown ->
// react-markdown (ESM-only). Jest's transformIgnorePatterns allowlist excludes
// the markdown ESM tree, so those leaf modules are stubbed here.
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

jest.mock('@sistent/mui-datatables', () => ({
  __esModule: true,
  default: () => null
}));

let mockViewportWidth = 1200;

jest.mock('../custom/Helpers/Dimension', () => ({
  useWindowDimensions: () => ({ width: mockViewportWidth, height: 800 })
}));

const renderWithTheme = (ui: React.ReactElement) =>
  render(<SistentThemeProvider>{ui}</SistentThemeProvider>);

describe('DataTableToolbar', () => {
  beforeEach(() => {
    mockViewportWidth = 1200;
  });
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
      const rightSection = screen.getByTestId('data-table-toolbar-right-section');
      expect(window.getComputedStyle(rightSection).marginLeft).toBe('auto');
    });

    it('keeps left content on the left when only left content is present', () => {
      renderWithTheme(<DataTableToolbar primaryActions={<button data-testid="left-content">Add</button>} />);
      const leftSection = screen.getByTestId('data-table-toolbar-left-section');
      expect(window.getComputedStyle(leftSection).marginLeft).not.toBe('auto');
    });

    it('separates left and right content to opposite ends when both are present', () => {
      renderWithTheme(
        <DataTableToolbar
          primaryActions={<button data-testid="left-btn">Add</button>}
          search={<span data-testid="right-content">Search</span>}
        />
      );
      const leftSection = screen.getByTestId('data-table-toolbar-left-section');
      const rightSection = screen.getByTestId('data-table-toolbar-right-section');

      expect(window.getComputedStyle(leftSection).marginLeft).not.toBe('auto');
      expect(window.getComputedStyle(rightSection).marginLeft).toBe('auto');
    });

    it('hides trailing controls when compactTrailing is true', () => {
      renderWithTheme(
        <DataTableToolbar
          search={<span data-testid="search-slot">Search</span>}
          filter={<span data-testid="filter-slot">Filter</span>}
          viewSwitch={<span data-testid="view-switch">Grid/Table</span>}
          compactTrailing
        />
      );
      expect(screen.getByTestId('search-slot')).toBeTruthy();
      expect(screen.queryByTestId('filter-slot')).toBeNull();
      expect(screen.queryByTestId('view-switch')).toBeNull();
      expect(screen.queryByTestId('data-table-toolbar-trailing-controls')).toBeNull();
    });

    it('groups search and trailing controls in the right controls group', () => {
      renderWithTheme(
        <DataTableToolbar
          primaryActions={<button data-testid="left-btn">Add</button>}
          search={<span data-testid="search-slot">Search</span>}
          viewSwitch={<span data-testid="view-switch">Grid/Table</span>}
          compactTrailing={false}
        />
      );

      const controlsGroup = screen.getByTestId('data-table-toolbar-right-controls');
      const rightSection = screen.getByTestId('data-table-toolbar-right-section');

      expect(controlsGroup.contains(screen.getByTestId('search-slot'))).toBe(true);
      expect(controlsGroup.contains(screen.getByTestId('view-switch'))).toBe(true);
      expect(rightSection.contains(controlsGroup)).toBe(true);
      expect(window.getComputedStyle(rightSection).marginLeft).toBe('auto');
    });

    it('auto-hides trailing controls on narrow viewports when compactTrailing is omitted', () => {
      mockViewportWidth = 400;

      renderWithTheme(
        <DataTableToolbar
          search={<span data-testid="search-slot">Search</span>}
          viewSwitch={<span data-testid="view-switch">Grid/Table</span>}
        />
      );

      expect(screen.getByTestId('search-slot')).toBeTruthy();
      expect(screen.queryByTestId('view-switch')).toBeNull();
      expect(screen.queryByTestId('data-table-toolbar-trailing-controls')).toBeNull();
    });

    it('keeps trailing controls visible on narrow viewports when compactTrailing is false', () => {
      mockViewportWidth = 400;

      renderWithTheme(
        <DataTableToolbar
          search={<span data-testid="search-slot">Search</span>}
          viewSwitch={<span data-testid="view-switch">Grid/Table</span>}
          compactTrailing={false}
        />
      );

      expect(screen.getByTestId('search-slot')).toBeTruthy();
      expect(screen.getByTestId('view-switch')).toBeTruthy();
      expect(screen.getByTestId('data-table-toolbar-trailing-controls')).toBeTruthy();
    });
  });
});
