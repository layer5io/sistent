import React, { act } from 'react';
import { render, waitFor } from '@testing-library/react';
import type { MUIDataTableColumn, MUIDataTableOptions, MUIDataTableProps } from 'mui-datatables';
import ResponsiveDataTable from '../custom/ResponsiveDataTable';

const muiDataTableMock = jest.fn();

jest.mock('react-markdown', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: unknown) => React.createElement('div', props)
  };
});

jest.mock('rehype-raw', () => () => null);
jest.mock('remark-gfm', () => () => null);

jest.mock('../custom', () => {
  const React = require('react');
  return {
    __esModule: true,
    CustomTooltip: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children)
  };
});

jest.mock('mui-datatables', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: (props: MUIDataTableProps) => {
      muiDataTableMock(props);
      return React.createElement('div', { 'data-testid': 'mui-datatables' });
    },
    MUIDataTableColumn: {}
  };
});

describe('ResponsiveDataTable', () => {
  beforeEach(() => {
    muiDataTableMock.mockClear();
  });

  it('applies default table options', () => {
    const columns: MUIDataTableColumn[] = [{ name: 'id', label: 'ID' }];

    render(
      <ResponsiveDataTable
        columns={columns}
        data={[]}
        tableCols={columns}
        columnVisibility={{}}
      />
    );

    expect(muiDataTableMock).toHaveBeenCalled();
    const props = muiDataTableMock.mock.calls[0][0] as MUIDataTableProps;
    const options = props.options as MUIDataTableOptions;

    expect(options).toEqual(
      expect.objectContaining({
        print: false,
        download: false,
        search: false,
        filter: false,
        viewColumns: false,
        rowsPerPageOptions: [10, 25, 50, 100],
        elevation: 0,
        enableNestedDataAccess: '.'
      })
    );
  });

  it('updates column visibility via onViewColumnsChange', async () => {
    const columns: MUIDataTableColumn[] = [{ name: 'name', label: 'Name', options: { display: true } }];
    const updateCols = jest.fn();

    render(
      <ResponsiveDataTable
        columns={columns}
        data={[]}
        tableCols={columns}
        columnVisibility={{ name: true }}
        updateCols={updateCols}
      />
    );

    await waitFor(() => expect(updateCols).toHaveBeenCalled());

    const props = muiDataTableMock.mock.calls[0][0] as MUIDataTableProps;
    const options = props.options as MUIDataTableOptions;

    act(() => {
      options.onViewColumnsChange?.('name', 'remove');
    });

    expect(columns[0].options?.display).toBe(false);
    expect(updateCols).toHaveBeenCalledTimes(2);
  });

  it('attaches date renderer for known date columns', async () => {
    const columns: MUIDataTableColumn[] = [{ name: 'updated_at', label: 'Updated At', options: {} }];
    const updateCols = jest.fn();

    render(
      <ResponsiveDataTable
        columns={columns}
        data={[]}
        tableCols={columns}
        columnVisibility={{ updated_at: true }}
        updateCols={updateCols}
      />
    );

    await waitFor(() => expect(updateCols).toHaveBeenCalled());

    const renderer = columns[0].options?.customBodyRender;
    expect(typeof renderer).toBe('function');

    const element = renderer && renderer('2024-01-01T00:00:00Z');
    expect(element).toBeTruthy();
  });
});
