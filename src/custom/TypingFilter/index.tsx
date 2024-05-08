import { Fade, Popper } from '@mui/material';
import { ContentFilterIcon, CrossCircleIcon } from 'packages/svg/dist';
import React from 'react';
import { ClickAwayListener } from '../../base/ClickAwayListener';
import { IconButton } from '../../base/IconButton';
import { InputAdornment } from '../../base/Input';
import {
  FilterSchema,
  FilteringEvents,
  FilteringState,
  filterReducer
} from '../../utils/typing.state';
import { getFilters } from '../../utils/typing.utils';
import TypingFilterInput from './TypingFIlterInput';
import { TypingFilters } from './TypingFIlters';
import { TypingFilterValueSuggestions } from './TypingFilterSuggestions';

interface TypingFilterType {
  filterSchema: FilterSchema;
  handleFilter: (filters: object) => void;
  autoFilter: boolean;
}

export function TypingFilter({ filterSchema, handleFilter, autoFilter = false }: TypingFilterType) {
  const inputFieldRef = React.useRef<HTMLInputElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isPopperOpen = Boolean(anchorEl);

  const [filterState, dispatch] = React.useReducer(filterReducer, {
    state: FilteringState.IDLE,
    context: {
      value: '',
      prevValue: ['']
    }
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!anchorEl) {
      setAnchorEl(e.currentTarget);
    }

    if (e.target.value === '') {
      return dispatch({
        type: FilteringEvents.CLEAR
      });
    }

    dispatch({
      type: FilteringEvents.INPUT_CHANGE,
      payload: {
        value: e.target.value
      }
    });
  };

  const handleClear = () => {
    dispatch({
      type: FilteringEvents.EXIT
    });

    handleFilter({});
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setAnchorEl(e.currentTarget);
    dispatch({ type: FilteringEvents.START });
  };

  const handleClickAway = (e: MouseEvent | TouchEvent) => {
    if (inputFieldRef.current && inputFieldRef.current.contains(e.target as Node)) {
      return;
    }

    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (!inputFieldRef.current) {
      return;
    }

    const inputField = inputFieldRef.current; // Copy the value to a variable

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        // Perform nullish check before accessing inputField.value
        const inputValue = inputField?.value ?? '';
        handleFilter(getFilters(inputValue, filterSchema));
        setAnchorEl(null);
      }
    };

    inputField?.addEventListener('keydown', handleKeyDown);

    return () => {
      inputField?.removeEventListener('keydown', handleKeyDown);
    };
  }, [filterSchema, handleFilter]);

  React.useEffect(() => {
    if (autoFilter && filterState.state === FilteringState.SELECTING_FILTER) {
      // Perform nullish check before accessing filterState.context
      const filterValue = filterState.context?.value ?? '';
      handleFilter(getFilters(filterValue, filterSchema));
    }
  }, [filterState.state, autoFilter, filterSchema, filterState.context?.value, handleFilter]);

  return (
    <React.Fragment>
      <TypingFilterInput
        ref={inputFieldRef}
        variant="outlined"
        placeholder="Filter Notifications"
        fullWidth
        size="small"
        value={filterState.context?.value}
        onChange={handleFilterChange}
        onFocus={handleFocus}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {' '}
              <ContentFilterIcon
              /*
                  fill={(theme) => {
                    theme.palette.iconMain;
                  }}
                  */
              />{' '}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClear}>
                {filterState.state !== FilteringState.IDLE && (
                  <CrossCircleIcon
                  /*fill={(theme) => {
                        theme.palette.iconMain;
                      }}
                      */
                  />
                )}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Popper
        open={filterState.state != FilteringState.IDLE && isPopperOpen}
        anchorEl={inputFieldRef.current}
        placement="bottom-start"
        style={{ zIndex: 2000 }}
        transition
        className="mui-fixed"
      >
        {({ TransitionProps }) => {
          return (
            <Fade {...TransitionProps} timeout={100}>
              <ClickAwayListener onKeydown onClickAway={handleClickAway}>
                <div
                  style={{
                    width: inputFieldRef.current ? inputFieldRef.current.clientWidth : 0
                  }}
                >
                  {filterState.state == FilteringState.SELECTING_FILTER && (
                    <TypingFilters
                      filterStateMachine={filterState}
                      dispatchFilterMachine={dispatch}
                      filterSchema={filterSchema}
                    />
                  )}
                  {filterState.state == FilteringState.SELECTING_VALUE && (
                    <TypingFilterValueSuggestions
                      filterStateMachine={filterState}
                      dispatchFilterMachine={dispatch}
                      filterSchema={filterSchema}
                    />
                  )}
                </div>
              </ClickAwayListener>
            </Fade>
          );
        }}
      </Popper>
    </React.Fragment>
  );
}
