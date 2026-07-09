import { Drawer, styled, useMediaQuery } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { Button, IconButton } from '../base';
import { ClickAwayListener } from '../base/ClickAwayListener';
import { InputLabel } from '../base/InputLabel';
import { MenuItem } from '../base/MenuItem';
import { Paper } from '../base/Paper';
import { Select } from '../base/Select';
import { FilterIcon } from '../icons';
import { useTheme } from '../theme';
import PopperListener from './PopperListener';

export interface FilterColumn {
  name: string;
  options: { label: string; value: string }[];
}

const normalizeFilters = (filters?: Record<string, string> | null): Record<string, string> =>
  Object.entries(filters ?? {}).reduce<Record<string, string>>((acc, [key, value]) => {
    acc[key] = value ?? 'All';
    return acc;
  }, {});

export interface UniversalFilterProps {
  filters: Record<string, FilterColumn>;
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  variant: 'filled' | 'standard' | 'outlined';
  handleApplyFilter: (filters?: Record<string, string>) => void;
  showAllOption?: boolean;
  id: string;
  'data-testid'?: string;
}

export const FilterHeader = styled('div')(({ theme }) => ({
  background: theme.palette.surface.tint,
  color: theme.palette.common.white,
  padding: '0.75rem 1rem',
  margin: '-1rem -1rem 1rem -1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

function UniversalFilter({
  filters,
  selectedFilters,
  setSelectedFilters,
  variant = 'outlined',
  handleApplyFilter,
  showAllOption = true,
  id,
  'data-testid': testId = 'universal-filter'
}: UniversalFilterProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);
  const [draftFilters, setDraftFilters] = React.useState<Record<string, string>>(
    normalizeFilters(selectedFilters)
  );

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Track the serialized value rather than the object reference so a parent that
  // passes a new `selectedFilters` reference with unchanged values (e.g. an inline
  // object literal) does not reset the user's in-progress draft selections.
  const serializedSelectedFilters = JSON.stringify(selectedFilters);

  React.useEffect(() => {
    setDraftFilters(normalizeFilters(selectedFilters));
  }, [serializedSelectedFilters]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setDraftFilters(normalizeFilters(selectedFilters));
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: string }>, columnName: string) => {
    const value = event.target.value;
    setDraftFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: value
    }));
  };

  const handleApplyOnClick = () => {
    const appliedFilters = { ...draftFilters };
    setSelectedFilters(appliedFilters);
    handleClose();
    handleApplyFilter(appliedFilters);
  };

  const renderFilterContent = () => (
    <div>
      <FilterHeader data-testid={`${testId}-header`}>
        <h3>Filters: </h3>
      </FilterHeader>
      {Object.keys(filters).map((filterColumn) => {
        const options = filters[filterColumn].options;
        const draftValue = draftFilters[filterColumn] ?? 'All';
        // When the "All" option is hidden, fall back to the first available option
        // instead of "All" so the Select never holds an out-of-range value.
        const isValidValue =
          draftValue === 'All'
            ? showAllOption
            : options.some((option) => option.value === draftValue);
        const selectValue = isValidValue ? draftValue : (options[0]?.value ?? 'All');
        return (
          <div
            key={filterColumn}
            role="presentation"
            data-testid={`${testId}-filter-group-${filterColumn}`}
          >
            <InputLabel
              id={filters[filterColumn].name}
              data-testid={`${testId}-label-${filterColumn}`}
            >
              {filters[filterColumn].name}
            </InputLabel>
            <Select
              data-testid={`${testId}-select-${filterColumn}`}
              key={filterColumn}
              value={selectValue}
              variant={variant}
              onChange={(e: SelectChangeEvent<unknown>) =>
                handleFilterChange(e as React.ChangeEvent<{ value: string }>, filterColumn)
              }
              style={{
                width: '20rem',
                marginBottom: '1rem'
              }}
              MenuProps={{ disablePortal: true }}
              slotProps={{
                input: {
                  'aria-label': 'Without label'
                }
              }}
              displayEmpty
            >
              {showAllOption && (
                <MenuItem value="All" data-testid={`${testId}-option-all`}>
                  All
                </MenuItem>
              )}
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  data-testid={`${testId}-option-${option.value}`}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        );
      })}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          onClick={handleApplyOnClick}
          data-testid={`${testId}-apply-btn`}
        >
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div id={id} data-testid={testId}>
        <IconButton
          onClick={handleClick}
          data-testid={`${testId}-trigger`}
          size="small"
        >
          <FilterIcon fill={theme.palette.icon.default} />
        </IconButton>
        {!isMobile ? (
          <PopperListener
            id={open && anchorEl ? 'transition-popper' : undefined}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-end"
          >
            <ClickAwayListener
              onClickAway={handleClose}
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
            >
              <Paper
                sx={{
                  padding: '1rem',
                  paddingTop: '1.8rem',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  backgroundColor: theme.palette.background.surfaces
                }}
              >
                {renderFilterContent()}
              </Paper>
            </ClickAwayListener>
          </PopperListener>
        ) : (
          <Drawer
            anchor="bottom"
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                padding: '0 1rem 1rem 1rem',
                backgroundColor: theme.palette.background.surfaces
              }
            }}
          >
            {renderFilterContent()}
          </Drawer>
        )}
      </div>
    </>
  );
}
export default UniversalFilter;
