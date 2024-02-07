export const Delimiter = {
  FILTER: ' ',
  FILTER_VALUE: ':'
};

export enum FilteringState {
  IDLE = 'idle',
  SELECTING_FILTER = 'selecting_filter',
  SELECTING_VALUE = 'selecting_value'
}

export enum FilteringEvents {
  START = 'start',
  // SELECT = "select_filter",
  SELECT_FILTER = 'select_filter',
  INPUT_CHANGE = 'input_change',
  SELECT_FILTER_VALUE = 'select_filter_value',
  CLEAR = 'clear',
  EXIT = 'exit'
}

export interface FilterStateType {
  state: FilteringState;
  context?: {
    value?: string;
    prevValue?: string[];
  };
}

export interface FilterActionType {
  type: FilteringEvents;
  payload?: {
    value?: string;
  };
}

/**
 * Filter Schema Object
 *
 * The `filterSchema` object defines available filter options for the TypingFilter component.
 * It provides information about different filter categories, their descriptions, and possible values.
 */
export type FilterSchema = Record<
  string,
  {
    value?: string;
    description?: string;
    type?: string;
    values?: string[];
    multiple?: boolean;
  }
>;
/**
 * @example
 * // Example filter schema with multiple filter categories
 * const filterSchema = {
 *   SEVERITY: {
 *     value: "severity",
 *     description: "Filter by severity",
 *     values: ["Low", "Medium", "High"],
 *   },
 *   STATUS: {
 *     value: "status",
 *     description: "Filter by status",
 *     type: "string",
 *     values: ["Open", "Closed", "In Progress"],
 *   },
 *   CUSTOM_FILTER: {
 *     value: "custom",
 *     description: "Custom filter description",
 *     type: "number",
 *   },
 *   // Add more filter categories as needed
 * };
 */

export function commonReducer(
  stateMachine: FilterStateType,
  action: FilterActionType
): FilterStateType {
  const { context } = stateMachine;

  switch (action.type) {
    case FilteringEvents.CLEAR:
      return {
        state: FilteringState.SELECTING_FILTER,
        context: {
          ...context,
          value: '',
          prevValue: ['']
        }
      };
    case FilteringEvents.EXIT:
      return {
        state: FilteringState.IDLE,
        context: {
          ...context,
          value: '',
          prevValue: ['']
        }
      };
    default:
      return stateMachine;
  }
}

export function filterSelectionReducer(
  stateMachine: FilterStateType,
  action: FilterActionType,
  nextState: FilteringState,
  nextValue: (prevValue: string, selectedValue: string) => string
): FilterStateType {
  const { state, context } = stateMachine;

  const nextDelimiter =
    nextState === FilteringState.SELECTING_FILTER ? Delimiter.FILTER : Delimiter.FILTER_VALUE;

  const prevDelimiter =
    nextDelimiter == Delimiter.FILTER_VALUE ? Delimiter.FILTER : Delimiter.FILTER_VALUE;

  // Same state because the prevState is the same as the nextState (as we have only two states)
  const prevState = nextState;

  switch (action.type) {
    // Select a filter and move to start entering its value
    case FilteringEvents.SELECT_FILTER: {
      // ":" is used to separate the filter and its value
      const newValue = nextValue(context?.prevValue?.at(-1) ?? '', action.payload?.value ?? '');
      return {
        state: nextState,
        context: {
          ...context,
          value: newValue + nextDelimiter,
          prevValue: [...(context?.prevValue ?? []), newValue]
        }
      };
    }
    // " " is used to separate multiple filters
    case FilteringEvents.INPUT_CHANGE:
      // Prevent transition when the filter/value is empty
      if (
        action.payload?.value?.endsWith(nextDelimiter) &&
        context?.value?.endsWith(prevDelimiter)
      ) {
        return stateMachine;
      }
      // Prevent adding delimiters together
      if (
        action.payload?.value?.endsWith(prevDelimiter) &&
        context?.value?.endsWith(prevDelimiter)
      ) {
        return stateMachine;
      }

      if (action.payload?.value === context?.prevValue?.at(1)) {
        return {
          state: prevState,
          context: {
            ...context,
            prevValue: context?.prevValue?.slice(0, -1) ?? [],
            value: action.payload?.value ?? ''
          }
        };
      }

      if (action.payload?.value?.endsWith(nextDelimiter)) {
        const newValue = action.payload.value;
        return {
          state: nextState,
          context: {
            ...context,
            value: action.payload.value,
            prevValue: [...(context?.prevValue ?? []), newValue.slice(0, -1)]
          }
        };
      }

      return {
        // Stay in the same state
        state,
        context: {
          ...context,
          value: action.payload?.value
        }
      };
    default:
      return commonReducer(stateMachine, action);
  }
}

export function filterReducer(stateMachine: FilterStateType, action: FilterActionType) {
  const { state } = stateMachine;

  switch (state) {
    case FilteringState.IDLE:
      switch (action.type) {
        case FilteringEvents.START:
          return {
            ...stateMachine,
            state: FilteringState.SELECTING_FILTER
          };
        default:
          return stateMachine;
      }

    case FilteringState.SELECTING_FILTER:
      return filterSelectionReducer(
        stateMachine,
        action,
        FilteringState.SELECTING_VALUE,
        (prevValue, value) => prevValue + Delimiter.FILTER + value
      );

    case FilteringState.SELECTING_VALUE:
      return filterSelectionReducer(
        stateMachine,
        action,
        FilteringState.SELECTING_FILTER,
        (prevValue, value) => prevValue + Delimiter.FILTER_VALUE + value
      );

    // Run for all states
    default:
      return stateMachine;
  }
}
