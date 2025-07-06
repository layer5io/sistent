# Sistent Hooks

This directory contains all reusable custom React hooks for the Sistent design system. The hooks are organized into logical categories for better maintainability and discoverability.

## Directory Structure

```
src/hooks/
├── data/           # Data management and API-related hooks
├── ui/             # UI interaction and state management hooks
├── utils/          # General utility hooks
├── workspace/      # Workspace-specific hooks
└── index.ts        # Main exports
```

## Categories

### Data Hooks (`./data/`)

Hooks for managing data, API interactions, and data processing.

- `useRoomActivity` - WebSocket-based collaboration for room activity tracking
- `useResourceCleanData` - Resource data formatting and processing for Kubernetes resources

### UI Hooks (`./ui/`)

Hooks for managing UI state, interactions, and visual components.

- `useWindowDimensions` - Window dimension tracking with debounced resize handling
- `useNotification` - Notification management using notistack

### Utility Hooks (`./utils/`)

General-purpose utility hooks for common patterns.

- `useDebounce` - Debounce values with configurable delay
- `usePreventPageLeave` - Prevent users from leaving pages with unsaved changes
- `useLocalStorage` - Manage localStorage with React state synchronization
- `useToggle` - Simple boolean state toggle management
- `useTimeout` - Manage timeouts with automatic cleanup

### Workspace Hooks (`./workspace/`)

Hooks specific to workspace functionality and management.

- `useDesignAssignment` - Design assignment management for workspaces
- `useEnvironmentAssignment` - Environment assignment management for workspaces
- `useTeamAssignment` - Team assignment management for workspaces
- `useViewsAssignment` - Views assignment management for workspaces

## Usage

All hooks are exported from the main hooks index file and can be imported directly:

```typescript
import {
  useDebounce,
  useWindowDimensions,
  useNotification,
  useRoomActivity
} from '@layer5/sistent';
```

Or import specific categories:

```typescript
import { useDebounce, useToggle } from '@layer5/sistent';
```

## Adding New Hooks

When adding new hooks, please follow these guidelines:

1. **Categorization**: Place hooks in the appropriate directory based on their primary function
2. **Naming**: Use descriptive names starting with "use" following React conventions
3. **TypeScript**: Provide full type definitions for parameters and return values
4. **Documentation**: Include JSDoc comments describing the hook's purpose and usage
5. **Exports**: Add the hook to the appropriate category's index.ts file

## Examples

### Basic Usage

```typescript
import { useDebounce, useToggle } from '@layer5/sistent';

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, toggleOpen] = useToggle(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Use debouncedSearchTerm for API calls
  // Use toggleOpen for modal state
}
```

### Advanced Usage

```typescript
import { useLocalStorage, usePreventPageLeave } from '@layer5/sistent';

function FormComponent() {
  const [formData, setFormData] = useLocalStorage('formData', {});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  usePreventPageLeave(hasUnsavedChanges, 'You have unsaved changes!');

  // Form logic here
}
```

## Best Practices

1. **Keep hooks focused**: Each hook should have a single, well-defined responsibility
2. **Use TypeScript**: Always provide type definitions for better developer experience
3. **Handle cleanup**: Ensure proper cleanup of effects, timers, and event listeners
4. **Test thoroughly**: Write comprehensive tests for all hooks
5. **Document edge cases**: Include documentation for error handling and edge cases
