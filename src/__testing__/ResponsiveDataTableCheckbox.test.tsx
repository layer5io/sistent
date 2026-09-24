import { render, screen } from '@testing-library/react';
import React from 'react';
import { SistentThemeProvider } from '../theme';

jest.mock('@sistent/mui-datatables', () => {
  const MockMUIDataTable = ({
    components
  }: {
    components: { Checkbox: React.ComponentType<Record<string, unknown>> };
  }) => {
    const { Checkbox } = components;
    return (
      <div>
        <Checkbox data-description="row-select-header" data-testid="header-checkbox" />
        <Checkbox data-description="row-select" data-testid="row-checkbox" />
      </div>
    );
  };
  return { __esModule: true, default: MockMUIDataTable };
});

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('remark-gfm', () => ({ __esModule: true, default: () => {} }));

jest.mock('rehype-raw', () => ({ __esModule: true, default: () => {} }));

import ResponsiveDataTable from '../custom/ResponsiveDataTable';

const columns = [{ name: 'id', label: 'ID', options: { display: true } }];

const renderTable = () =>
  render(
    <SistentThemeProvider>
      <ResponsiveDataTable
        data={[['1']]}
        columns={columns}
        tableCols={columns}
        columnVisibility={{ id: true }}
      />
    </SistentThemeProvider>
  );

const FILTER_ALL_PATH_PREFIX = 'M3 5h2V3c-1.1 0-2 .9-2 2z';

const iconPathOf = (checkbox: HTMLElement) =>
  checkbox.querySelector('svg path')?.getAttribute('d') ?? '';

describe('ResponsiveDataTable select-all checkbox', () => {
  it('renders FilterAllIcon for the header checkbox', () => {
    renderTable();
    expect(iconPathOf(screen.getByTestId('header-checkbox'))).toContain(FILTER_ALL_PATH_PREFIX);
  });

  it('leaves row checkboxes on the default icon', () => {
    renderTable();
    expect(iconPathOf(screen.getByTestId('row-checkbox'))).not.toContain(FILTER_ALL_PATH_PREFIX);
  });

  it('labels the header checkbox for assistive technology', () => {
    renderTable();
    expect(screen.getByLabelText('select all rows')).toBeTruthy();
  });

  it('does not label row checkboxes as select-all', () => {
    renderTable();
    expect(
      screen.getByTestId('row-checkbox').querySelector('input')?.getAttribute('aria-label')
    ).toBeNull();
  });
});
