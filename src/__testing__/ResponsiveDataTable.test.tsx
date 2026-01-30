import { render, screen } from '@testing-library/react';
import React from 'react';
import { SistentThemeProvider } from '../theme';

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

jest.mock('@sistent/mui-datatables', () => {
  const MockMUIDataTable = ({
    data,
    columns
  }: {
    data: string[][];
    columns: { name: string; label: string }[];
  }) => (
    <table data-testid="mui-datatable">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.name}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
  return {
    __esModule: true,
    default: MockMUIDataTable
  };
});

// eslint-disable-next-line import/first
import ResponsiveDataTable from '../custom/ResponsiveDataTable';

const mockColumns = [
  { name: 'id', label: 'ID', options: { display: true } },
  { name: 'name', label: 'Name', options: { display: true } }
];

const mockData = [
  ['1', 'Test Item 1'],
  ['2', 'Test Item 2']
];

const mockColumnVisibility = {
  id: true,
  name: true
};

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<SistentThemeProvider>{ui}</SistentThemeProvider>);
};

describe('ResponsiveDataTable', () => {
  it('renders without errors', () => {
    renderWithTheme(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        tableCols={mockColumns}
        columnVisibility={mockColumnVisibility}
      />
    );
  });

  it('renders table with data', () => {
    renderWithTheme(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        tableCols={mockColumns}
        columnVisibility={mockColumnVisibility}
      />
    );
    expect(screen.getByText('Test Item 1')).toBeTruthy();
    expect(screen.getByText('Test Item 2')).toBeTruthy();
  });

  it('renders column headers', () => {
    renderWithTheme(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        tableCols={mockColumns}
        columnVisibility={mockColumnVisibility}
      />
    );
    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('Name')).toBeTruthy();
  });

  it('accepts custom rowsPerPageOptions', () => {
    renderWithTheme(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        tableCols={mockColumns}
        columnVisibility={mockColumnVisibility}
        rowsPerPageOptions={[5, 10, 20]}
      />
    );
  });

  it('calls updateCols when provided', () => {
    const mockUpdateCols = jest.fn();
    renderWithTheme(
      <ResponsiveDataTable
        data={mockData}
        columns={mockColumns}
        tableCols={mockColumns}
        columnVisibility={mockColumnVisibility}
        updateCols={mockUpdateCols}
      />
    );
    expect(mockUpdateCols).toHaveBeenCalled();
  });
});
