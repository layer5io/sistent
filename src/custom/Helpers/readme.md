# Helper Components

This directory contains a collection of utility and helper components that you can use across your project. These components are designed to simplify common tasks, enhance reusability, and improve code organization.

## Table of Contents

- [Available Helper Components](#available-helper-components)
- [How to Use](#how-to-use)
- [Examples](#examples)

## Available Helper Components

1. **Window Dimensions Hook**: A custom React hook for tracking changes in window dimensions.
   - **File**: `Dimension`
   - **Usage**: Provides the `useWindowDimensions` hook, which allows you to get the current window dimensions and react to changes in window size.
   - **Returns**: An object containing the current window dimensions, `{ width, height }`.

2. **Notification Hook**: A custom React hook for displaying notifications using notistack.
   - **File**: `Notification`
   - **Usage**: Provides the `useNotificationHandler` hook, which enqueues notistack snackbars.
   - **Returns**: A `notify(message, options?)` function that enqueues one snackbar per call.
   - **Limitation**: The hook reads the snackbar context of the notistack copy bundled into sistent, not the host's. A host's own `SnackbarProvider` comes from a different copy of notistack, so it does not reach this hook, and under it alone `notify` enqueues into notistack's default context, where nothing is shown.

## How to Use

To use these helper components in your project, follow these steps:

1. Navigate to the specific helper component directory (e.g., `dimension.ts`) to find details about its usage.

2. Import the required helper component into your code:

- **Example**: Importing the `useWindowDimensions` hook from the `Dimension` helper component:

  ```javascript
  import { useWindowDimensions } from '@sistent/sistent';
  const DimensionExample = () => {
    const { width, height } = useWindowDimensions();

    return (
      <div>
        <p>Window width: {width}</p>
        <p>Window height: {height}</p>
      </div>
    );
  };
  ```

  - **Example**: Importing the `useNotificationHandler` hook from the `Notification` helper component:

  ```javascript
  import { useNotificationHandler } from '@sistent/sistent';
  const NotificationHandlerExample = () => {
    const notify = useNotificationHandler();

    return <button onClick={() => notify('Hello world!', { variant: 'success' })}>Click me</button>;
  };
  ```

  Under a host's own `SnackbarProvider` this example shows nothing: see the limitation above.
