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

## How to Use

To use these helper components in your project, follow these steps:

1. Navigate to the specific helper component directory (e.g., `dimension.ts`) to find details about its usage.

2. Import the required helper component into your code:

   ```javascript
   import { useWindowDimensions } from './helpers';
   ```
