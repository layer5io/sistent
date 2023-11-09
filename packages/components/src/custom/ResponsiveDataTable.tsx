import MUIDataTable from 'mui-datatables';
import React from 'react';

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
}

const ResponsiveDataTable = ({
  data,
  columns,
  options = {},
  ...props
}: ResponsiveDataTableProps): JSX.Element => {
  const [tableCols, updateCols] = React.useState<Column[]>(columns);
  const [columnVisibility, ,] = React.useState<Record<string, boolean>>({});

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
    onViewColumnsChange: (column: string, action: string) => {
      switch (action) {
        case 'add': {
          const colToAdd = columns.find((obj) => obj.name === column);
          if (colToAdd) {
            colToAdd.options!.display = true;
            updateCols([...columns]);
          }
          break;
        }
        case 'remove': {
          const colToRemove = columns.find((obj) => obj.name === column);
          if (colToRemove) {
            colToRemove.options!.display = false;
            updateCols([...columns]);
          }
          break;
        }
      }
    }
  };

  React.useEffect(() => {
    columns?.forEach((col) => {
      console.log('Current Column:', col);
      if (typeof col === 'object' && col !== null) {
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
    updateCols([...columns]);
  }, [columnVisibility]);

  const components = {
    ExpandButton: () => ''
  };

  return (
    <MUIDataTable
      columns={columns || []}
      data={data || []}
      title={undefined}
      components={components}
      options={updatedOptions}
      tableCols={tableCols}
      updateCols={updateCols}
      {...props}
    />
  );
};

export default ResponsiveDataTable;
