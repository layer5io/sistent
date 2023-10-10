import React, { useEffect } from 'react';
import { DataTable } from '../../base/DataTable';

interface Column {
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

interface ResponsiveDataTableProps<T> {
  data: T[];
  columns: Column[];
  options?: object;
  tableCols: Column[];
  updateCols: (columns: Column[]) => void;
  columnVisibility: Record<string, boolean>;
  theme?: object;
}

const ResponsiveDataTable: React.FC<ResponsiveDataTableProps<unknown>> = ({
  data,
  columns,
  options = {},
  tableCols,
  updateCols,
  columnVisibility,
  ...props
}) => {
  const formatDate = (date: Date): string => {
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
  };

  const updatedOptions = {
    ...options,
    onViewColumnsChange: (column: string, action: string) => {
      switch (action) {
        case 'add': {
          const colToAdd = columns.find((obj) => obj.name === column);
          colToAdd.options.display = true;
          updateCols([...columns]);
          break;
        }
        case 'remove': {
          const colToRemove = columns.find((obj) => obj.name === column);
          colToRemove.options.display = false;
          updateCols([...columns]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    columns?.forEach((col) => {
      if (!col.options) {
        col.options = {};
      }
      col.options.display = columnVisibility[col.name];

      if (
        ['updated_at', 'created_at', 'deleted_at', 'last_login_time', 'joined_at'].includes(
          col.name
        )
      ) {
        col.options.customBodyRender = (value: string | number | boolean | object) => {
          if (value === 'NA') {
            return <>{value}</>;
          } else if (typeof value === 'object' && value.Valid === true) {
            // Ensure value is an object before accessing Valid and Time
            const date = new Date(value.Time as string);
            return <>{formatDate(date)}</>;
          } else if (typeof value === 'object' && value.Valid === false) {
            // Ensure value is an object before accessing Valid
            return <>NA</>;
          } else if (typeof value === 'string') {
            // Ensure value is a string before creating a Date object
            const date = new Date(value);
            return <>{formatDate(date)}</>;
          } else {
            return <>{value}</>;
          }
        };
      }
    });
    updateCols([...columns]);
  }, [columnVisibility]);
  const components = {
    ExpandButton: () => ''
  };

  return (
    <DataTable
      title={undefined}
      columns={tableCols}
      data={data}
      components={components}
      options={updatedOptions}
      {...props}
    />
  );
};

export default ResponsiveDataTable;
