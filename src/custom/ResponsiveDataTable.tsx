import MUIDataTable from 'mui-datatables';
import React, { useCallback } from 'react';

export interface Column {
  name: string;
  label: string;
  options?: {
    filter?: boolean;
    sort?: boolean;
    searchable?: boolean;
    display?: boolean;
    sortDescFirst?: boolean;
    customBodyRender?: (value: string | number | boolean | object) => JSX.Element;
  };
}

export interface ResponsiveDataTableProps {
  data: string[][];
  columns: Column[];
  options?: object;
  tableCols?: Column[];
  updateCols?: ((columns: Column[]) => void) | undefined;
  columnVisibility: Record<string, boolean> | undefined;
  theme?: object;
  colViews?: Record<string, boolean> | undefined;
  rowsPerPageOptions?: number[] | undefined;
}

const ResponsiveDataTable = ({
  data,
  columns,
  options = {},
  tableCols,
  updateCols,
  columnVisibility,
  rowsPerPageOptions = [10, 25, 50, 100], // Default and standard page size options
  ...props
}: ResponsiveDataTableProps): JSX.Element => {
  const formatDate = (date: Date): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('un-US', dateOptions).format(date);
  };

  const updatedOptions = {
    ...options,
    rowsPerPageOptions: rowsPerPageOptions,
    onViewColumnsChange: (column: string, action: string) => {
      switch (action) {
        case 'add': {
          const colToAdd = columns.find((obj) => obj.name === column);
          if (colToAdd) {
            if (colToAdd.options) {
              colToAdd.options.display = true;
              updateCols && updateCols([...columns]);
            }
          }
          break;
        }
        case 'remove': {
          const colToRemove = columns.find((obj) => obj.name === column);
          if (colToRemove) {
            if (colToRemove.options) {
              colToRemove.options.display = false;
              updateCols && updateCols([...columns]);
            }
          }
          break;
        }
      }
    }
  };

  const updateColumnsEffect = useCallback(() => {
    columns?.forEach((col) => {
      if (typeof col === 'object' && col !== null) {
        if (!col.options) {
          col.options = {};
        }
        col.options.display = columnVisibility && columnVisibility[col.name];

        if (
          [
            'updated_at',
            'created_at',
            'deleted_at',
            'last_login_time',
            'joined_at',
            'last_run',
            'next_run'
          ].includes(col.name)
        ) {
          col.options.customBodyRender = (value: string | number | boolean | object) => {
            if (value === 'NA' || value === null || value === undefined) {
              return <>{value}</>;
            } else if (typeof value === 'object' && 'Valid' in value) {
              const obj = value as { Valid: boolean; Time: string | undefined };
              if (obj.Valid && obj.Time) {
                const date = new Date(obj.Time);
                return <>{formatDate(date)}</>;
              } else {
                return <>NA</>;
              }
            } else if (typeof value === 'string') {
              const date = new Date(value);
              return <>{formatDate(date)}</>;
            } else {
              return <>{value}</>;
            }
          };
        }
      }
    });
    updateCols && updateCols([...columns]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnVisibility, updateCols]);

  React.useEffect(() => {
    updateColumnsEffect();
  }, [updateColumnsEffect]);

  const components = {
    ExpandButton: () => ''
  };

  return (
    <MUIDataTable
      columns={tableCols ?? []}
      data={data || []}
      title={undefined}
      components={components}
      options={updatedOptions}
      {...props}
    />
  );
};

export default ResponsiveDataTable;
