import React from 'react';
import { Divider } from '../../base/Divider';
import { List } from '../../base/List';
import { ListItem } from '../../base/ListItem';
import { Typography } from '../../base/Typography';
import { FilterSchema, FilterStateType, FilteringEvents } from '../../utils/typing.state';
import { getCurrentFilterAndValue } from '../../utils/typing.utils';

interface TypingFilterValueSuggestionsType {
  filterStateMachine: FilterStateType;
  dispatchFilterMachine: React.Dispatch<{
    type: FilteringEvents;
    payload: { value: string };
  }>;
  filterSchema: FilterSchema;
}

export function TypingFilterValueSuggestions({
  filterStateMachine,
  dispatchFilterMachine,
  filterSchema
}: TypingFilterValueSuggestionsType) {
  const selectValue = (value: string) => {
    dispatchFilterMachine({
      type: FilteringEvents.SELECT_FILTER,
      payload: {
        value
      }
    });
  };

  const { filter, value } = getCurrentFilterAndValue(filterStateMachine);
  const currentFilter = Object.values(filterSchema).find((f) => f.values == filter);
  const suggestions = currentFilter?.values?.filter((v) => v.startsWith(value)) ?? [];

  return (
    <List>
      {suggestions.length === 0 && (
        <ListItem disableGutters>
          <Typography variant="body1">No results available</Typography>
        </ListItem>
      )}
      {suggestions.map((suggestion) => (
        <React.Fragment key={suggestion}>
          <ListItem onClick={() => selectValue(suggestion)} disableGutters>
            <Typography variant="body1" component="body">
              {suggestion}
            </Typography>
          </ListItem>
          <Divider light />
        </React.Fragment>
      ))}
    </List>
  );
}
