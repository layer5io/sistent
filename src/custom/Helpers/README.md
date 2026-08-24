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
   - **Returns**: An object containing the current `width` and `height` in pixels.

2. **Notification Hook**: A custom React hook for displaying notifications using notistack.
   - **File**: `Notification`
   - **Usage**: Provides the `useNotificationHandler` hook, which allows you to display notifications.
   - **Returns**: The `notify` callback function directly for dispatching notifications.

## How to Use

To use these helper components in your project, follow these steps:

1. Navigate to the specific helper component directory (e.g., `Dimension/`) to find details about its usage.

2. Import the required helper component into your code.

## Examples

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

    return (
      <button onClick={() => notify({ message: 'Hello world!', variant: 'success' })}>
        Click me
      </button>
    );
  };
  ```
