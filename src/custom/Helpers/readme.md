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
   - **Returns**: An object containing the current window dimensions and a boolean value indicating whether the window is currently in landscape mode.

2. **Notification Hook**: A custom React hook for displaying notifications using notistack.
   - **File**: `Notification`
   - **Usage**: Provides the `useNotificationHandler` hook, which allows you to display notifications.
   - **Returns**: A stable `notify(message, options?)` function; `options` is notistack's `OptionsObject` (for example `{ variant: 'success' }`).
   - **Requires**: `notistack` is a peer dependency. Install it in the host app and render its `SnackbarProvider` above any component that calls the hook - the hook enqueues into the host's provider and shows nothing without one.

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
  ```

  - **Example**: Importing the `useNotificationHandler` hook from the `Notification` helper component:

  ```javascript
  import { SnackbarProvider } from 'notistack';
  import { useNotificationHandler } from '@sistent/sistent';

  // Once, near the root of the host app:
  // <SnackbarProvider><App /></SnackbarProvider>

  const NotificationHandlerExample = () => {
  const notify = useNotificationHandler();

  return (
   <button onClick={() => notify('Hello world!', { variant: 'success' })}>
    Click me
   </button>
  );
  ```
