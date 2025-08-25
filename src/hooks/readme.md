# Sistent Hooks

This directory contains all reusable custom React hooks for the Sistent design system. The hooks are organized into logical categories for better maintainability and discoverability.

## Directory Structure

```
src/hooks/
├── data/           # Data management and API-related hooks
├── ui/             # UI interaction and state management hooks
├── utils/          # General utility hooks
├── workspaces/     # Workspace-specific hooks
└── index.ts        # Main exports
```

## Categories

### Data Hooks (`./data/`)

Hooks for managing data, API interactions, and data processing.

- `useResourceCleanData` - Resource data formatting and processing for Kubernetes resources

### UI Hooks (`./ui/`)

Hooks for managing UI state, interactions, and visual components.

- `useWindowDimensions` - Window dimension tracking with debounced resize handling

### Utility Hooks (`./utils/`)

General-purpose utility hooks for common patterns.

- `useDebounce` - Debounce values with configurable delay
- `useDebouncedCallback` - Debounce function calls with configurable delay
- `usePreventUserFromLeavingPage` - Prevent users from leaving pages with unsaved changes
- `useStateCB` - State management with callback support for change tracking
- `useToggle` - Simple boolean state toggle management
- `useTimeout` - Manage timeouts with automatic cleanup

### Workspace Hooks (`./workspaces/`)

Hooks specific to workspace functionality and management.

- `useDesignAssignment` - Design assignment management for workspaces
- `useEnvironmentAssignment` - Environment assignment management for workspaces
- `useTeamAssignment` - Team assignment management for workspaces
- `useViewsAssignment` - Views assignment management for workspaces

### Import Options

With the configured path mapping, you have multiple import options:

#### Option 1: Category-based imports (Recommended)

```typescript
// Import from specific categories
import { useDebounce, useToggle, useTimeout } from 'hooks/utils';
import { useWindowDimensions } from 'hooks/ui';
import { useDesignAssignment } from 'hooks/workspaces';
```

#### Option 2: Absolute path imports

```typescript
// Using absolute paths with @ alias
import { useDebounce } from '@/src/hooks/utils';
import { useWindowDimensions } from '@/src/hooks/ui';
```

#### Option 3: Traditional relative imports

```typescript
// Relative imports (still work)
import { useDebounce } from 'hooks/utils';
```

## Adding New Hooks

When adding new hooks, please follow these guidelines:

1. **Categorization**: Place hooks in the appropriate directory based on their primary function
2. **Naming**: Use descriptive names starting with "use" following React conventions
3. **TypeScript**: Provide full type definitions for parameters and return values
4. **Documentation**: Include JSDoc comments describing the hook's purpose and usage
5. **Exports**: Add the hook to the appropriate category's index.ts file
6. **Default Export**: Use default exports with the pattern:

   ```typescript
   function useMyHook() {
     // implementation
   }

   export default useMyHook;
   ```

## Examples

### Basic Usage

```typescript
import { useDebounce, useToggle } from 'hooks/utils';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, toggleOpen] = useToggle(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Use debouncedSearchTerm for API calls
  // Use toggleOpen for modal state
}
```

## Best Practices

1. **Keep hooks focused**: Each hook should have a single, well-defined responsibility
2. **Use TypeScript**: Always provide type definitions for better developer experience
3. **Handle cleanup**: Ensure proper cleanup of effects, timers, and event listeners
4. **Avoid `any` types**: Use `unknown` or specific types instead of `any`
5. **Default exports**: Follow the established pattern of default exports
6. **Consistent imports**: Use the path mapping for cleaner, more maintainable imports
7. **Test thoroughly**: Write comprehensive tests for all hooks
8. **Document edge cases**: Include documentation for error handling and edge cases

## File Structure Example

```typescript
// src/hooks/utils/useMyHook.ts
import { useState, useEffect } from 'react';

/**
 * Custom hook for managing something
 * @param initialValue - The initial value
 * @returns The managed state and setter
 */
function useMyHook<T>(initialValue: T): [T, (value: T) => void] {
  // Implementation
}

export default useMyHook;
```

```typescript
// src/hooks/utils/index.ts
export { default as useDebounce } from './useDebounce';
export { default as useMyHook } from './useMyHook';
// ... other exports
```
