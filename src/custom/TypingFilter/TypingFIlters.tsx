import React from 'react';
import { Divider } from '../../base/Divider';
import { List } from '../../base/List';
import { ListItem } from '../../base/ListItem';
import { Typography } from '../../base/Typography';
import { FilterSchema, FilterStateType, FilteringEvents } from '../../utils/typing.state';
import { getCurrentFilterAndValue } from '../../utils/typing.utils';

interface TypingFiltersType {
  filterStateMachine: FilterStateType;
  dispatchFilterMachine: React.Dispatch<{
    type: FilteringEvents;
    payload: { value: string };
  }>;
  filterSchema: FilterSchema;
}

export function TypingFilters({
  filterStateMachine,
  dispatchFilterMachine,
  filterSchema
}: TypingFiltersType) {
  const selectFilter = (filter: string) => {
    dispatchFilterMachine({
      type: FilteringEvents.SELECT_FILTER,
      payload: {
        value: filter
      }
    });
  };
  const { filter: currentFilter } = getCurrentFilterAndValue(filterStateMachine);

  const matchingFilters = currentFilter
    ? Object.values(filterSchema).filter((filter) => filter.value.startsWith(currentFilter))
    : Object.values(filterSchema);
  return (
    <List>
      {matchingFilters.length == 0 && (
        <ListItem>
          <Typography variant="body1">Sorry we dont currently support this filter</Typography>
        </ListItem>
      )}
      {matchingFilters.map((filter) => (
        <React.Fragment key={filter}>
          <ListItem disableGutters onClick={() => selectFilter(filter.values)}>
            <Typography variant="body1">{filter.values}:</Typography>
            <Typography variant="body1">{filter.description}</Typography>
          </ListItem>
          <Divider light />
        </React.Fragment>
      ))}
    </List>
  );
}
