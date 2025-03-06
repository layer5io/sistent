import MUIDataTable from 'mui-datatables';
import { useEffect, useState } from 'react';

export function ResponsiveDataTable({ data, columns, options = {}, ...props }) {
  const [tableCols, updateCols] = useState(columns);
  const [columnVisibility, ,] = useState({});

  const formatDate = (date) => {
    const dateOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    return new Intl.DateTimeFormat('un-US', dateOptions).format(date);
  };

  const updatedOptions = {
    ...options,
    onViewColumnsChange: (column, action) => {
      switch (action) {
        case 'add': {
          const colToAdd = columns.find((obj) => obj.name === column);
          if (colToAdd) {
            colToAdd.options.display = true;
            updateCols([...columns]);
          }
          break;
        }
        case 'remove': {
          const colToRemove = columns.find((obj) => obj.name === column);
          if (colToRemove) {
            colToRemove.options.display = false;
            updateCols([...columns]);
          }
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
        col.options.customBodyRender = (value) => {
          if (value === 'NA') {
            return <>{value}</>;
          } else if (typeof value === 'object' && 'Valid' in value) {
            const obj = value;
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
}
