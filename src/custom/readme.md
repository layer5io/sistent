# Responsive Data Table Component

This custom React component, `ResponsiveDataTable`, is a wrapper around the Material-UI (MUI) DataTables library (`mui-datatables`). It provides a responsive and customizable table with additional features tailored for specific use cases. Below is an explanation of each component and its functionalities.

## Props

### Column Interface

| Property                   | Type                                                            | Description                                                                |
| -------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `name`                     | `string`                                                        | The key representing the column in the data array.                         |
| `label`                    | `string`                                                        | The label to be displayed for the column.                                  |
| `options`                  | `object`                                                        | (Optional) Additional options for customizing the column behavior.         |
| `options.filter`           | `boolean`                                                       | (Optional) Enable or disable filtering for the column.                     |
| `options.sort`             | `boolean`                                                       | (Optional) Enable or disable sorting for the column.                       |
| `options.searchable`       | `boolean`                                                       | (Optional) Enable or disable searching for the column.                     |
| `options.display`          | `boolean`                                                       | (Optional) Set to `true` if the column should be displayed initially.      |
| `options.sortDescFirst`    | `boolean`                                                       | (Optional) Set to `true` to sort the column in descending order initially. |
| `options.customBodyRender` | `(value: string \| number \| boolean \| object) => JSX.Element` | (Optional) Custom function for rendering the column's body.                |

### DataTableProps Interface

| Property           | Type                                   | Description                                                                                                 |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `data`             | `string[][]`                           | The data to be displayed in the table.                                                                      |
| `columns`          | `Column[]`                             | An array of column definitions.                                                                             |
| `options`          | `object`                               | (Optional) Additional options for customizing the MUI DataTable.                                            |
| `tableCols`        | `Column[]`                             | (Optional) Columns to be displayed in the MUI DataTable. If not provided, all columns will be displayed.    |
| `updateCols`       | `(columns: Column[]) => void`          | (Optional) Callback function to update column visibility.                                                   |
| `columnVisibility` | `Record<string, boolean> \| undefined` | (Optional) Object representing the visibility status of each column.                                        |
| `theme`            | `object`                               | (Optional) Theme object for styling the table.                                                              |
| `colViews`         | `Record<string, boolean> \| undefined` | (Optional) Object representing the visibility status of each column. This is similar to `columnVisibility`. |

## Customization

### Column Visibility

The `ResponsiveDataTable` component allows for columns to be hidden or shown based on the user's preference. This is done by passing a `columnVisibility` object to the component. The keys of the object should be the column names, and the values should be booleans representing the visibility status of each column. The `updateCols` prop is also required to be passed to the component. This prop is a callback function that will be called whenever the user changes the visibility of a column. The function will be passed an array of column definitions, which can be used to update the `columns` prop of the component. The `ResponsiveDataTable` component will then re-render with the updated columns.

### Custom rendering

Custom rendering for specific columns can be achieved using the `options.customBodyRender` property in the column definition. This is useful for formatting dates or rendering complex data.

### Date formatting

The component includes a formatDate function to format date values consistently. You can customize the date formatting by modifying the formatDate function.
