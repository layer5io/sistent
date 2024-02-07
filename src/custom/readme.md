# Custom Components

## Responsive Data Table Component

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

### Standard Props

| Property             | Type       | Description                                                                                                                          |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `rowsPerPageOptions` | `number[]` | (Optional) Array of numbers representing the number of rows per page. If not provided, the default values will be used(20, 50, 100). |

### Customization

### Column Visibility

The `ResponsiveDataTable` component allows for columns to be hidden or shown based on the user's preference. This is done by passing a `columnVisibility` object to the component. The keys of the object should be the column names, and the values should be booleans representing the visibility status of each column. The `updateCols` prop is also required to be passed to the component. This prop is a callback function that will be called whenever the user changes the visibility of a column. The function will be passed an array of column definitions, which can be used to update the `columns` prop of the component. The `ResponsiveDataTable` component will then re-render with the updated columns.

### Custom rendering

Custom rendering for specific columns can be achieved using the `options.customBodyRender` property in the column definition. This is useful for formatting dates or rendering complex data.

### Date formatting

The component includes a formatDate function to format date values consistently. You can customize the date formatting by modifying the formatDate function.

<hr>

## Custom Search Component

## Overview

The `SearchBar` component is a reusable search bar. This component provides a user-friendly interface for searching within your application. It features a text input field with the ability to expand and collapse, a search icon, and a clear icon for removing the entered search text.

## Props

| Property      | Type     | Description                                                                           |
| ------------- | -------- | ------------------------------------------------------------------------------------- |
| `onSearch`    | `func`   | Callback function to handle the search logic.                                         |
| `onClear`     | `func`   | Callback function to handle the clear logic.                                          |
| `placeholder` | `string` | (Optional) Placeholder text to be displayed in the search bar.                        |
| `expanded`    | `bool`   | (Optional) Set to `true` if the search bar should be expanded initially.              |
| `setExpanded` | `func`   | (Optional) Callback function to update the expanded state of the search bar.          |
| `iconFill`    | `string` | (Optional) Color of the search icon. If not provided, the default color will be used. |

## Usage

```javascript
import React, { useState } from 'react';
import SearchBar from '@layer5/sistent/components';

function App() {
  const [searchText, setSearchText] = useState('');

  // this handles the search logic only will be needed if the api doesn't have search param
  const handleSearch = (text) => {
    // Handle the search logic here
    setSearchText(text);
  };

  const handleClear = () => {
    // Handle the clear logic here
    setSearchText('');
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        onClear={handleClear}
        placeholder="Search..."
        expanded={searchText !== ''}
        setExpanded={(isExpanded) => setSearchText(isExpanded)}
        iconFill="#000" // Optional: customize the icon color
      />
      {/* Your application content here */}
    </div>
  );
}

export default App;
```
