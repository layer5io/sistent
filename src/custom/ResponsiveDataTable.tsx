import { Theme, ThemeProvider, createTheme } from '@mui/material';
import MUIDataTable from 'mui-datatables';
import React, { useCallback } from 'react';
import { CustomTooltip } from './CustomTooltip';

const dataTableTheme = (theme: Theme) =>
  createTheme({
    ...theme,
    components: {
      ...theme.components,
      MuiTable: {
        styleOverrides: {
          root: {
            // border: `2px solid ${theme.palette.border.normal}`,
            width: '-webkit-fill-available',
            '@media (max-width: 500px)': {
              wordWrap: 'break-word'
            },
            background: theme.palette.background.constant?.table,
            color: theme.palette.text.default
          }
        }
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          data: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.palette.text.default
          },
          root: {
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: theme.palette.text.default
          }
        }
      },
      MUIDataTableSearch: {
        styleOverrides: {
          main: {
            '@media (max-width: 600px)': {
              justifyContent: 'center'
            }
          }
        }
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            intermediate: false,
            color: 'transparent',
            '&.Mui-checked': {
              color: theme.palette.text.default,
              '& .MuiSvgIcon-root': {
                width: '1.25rem',
                height: '1.25rem',
                borderColor: theme.palette.border.brand,
                marginLeft: '0px',
                padding: '0px'
              }
            },
            '&.MuiCheckbox-indeterminate': {
              color: theme.palette.background.brand?.default
            },
            '& .MuiSvgIcon-root': {
              width: '1.25rem',
              height: '1.25rem',
              border: `.75px solid ${theme.palette.border.strong}`,
              borderRadius: '2px',
              padding: '0px'
            },
            '&:hover': {
              backgroundColor: 'transparent'
            },
            '&.Mui-disabled': {
              '&:hover': {
                cursor: 'not-allowed'
              }
            }
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          body: {
            color: theme.palette.text.default
          },
          root: {
            borderBottom: `1px solid ${theme.palette.border.default}`
          }
        }
      },
      MUIDataTablePagination: {
        styleOverrides: {
          toolbar: {
            color: theme.palette.text.default
          }
        }
      },
      MUIDataTableSelectCell: {
        styleOverrides: {
          headerCell: {
            background: theme.palette.background.constant?.table
          }
        }
      },
      MuiInput: {
        styleOverrides: {
          root: {
            '&:before': {
              borderBottom: `2px solid ${theme.palette.border.brand}`
            },
            '&.Mui-focused:after': {
              borderBottom: `2px solid ${theme.palette.border.brand}`
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottom: `2px solid ${theme.palette.border.brand}`
            }
          }
        }
      }
    }
  });

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
    print: false,
    download: false,
    search: false,
    filter: false,
    viewColumns: false,
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
    <ThemeProvider theme={dataTableTheme}>
      <MUIDataTable
        columns={tableCols ?? []}
        data={data || []}
        title={undefined}
        components={{
          Tooltip: CustomTooltip as unknown as React.ReactNode,
          ...components
        }}
        options={updatedOptions}
        {...props}
      />
    </ThemeProvider>
  );
};

export default ResponsiveDataTable;
