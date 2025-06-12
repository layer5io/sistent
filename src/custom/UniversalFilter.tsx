import { Drawer, styled, useMediaQuery } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { Button } from '../base/Button';
import { ClickAwayListener } from '../base/ClickAwayListener';
import { InputLabel } from '../base/InputLabel';
import { MenuItem } from '../base/MenuItem';
import { Paper } from '../base/Paper';
import { Select } from '../base/Select';
import { FilterIcon } from '../icons';
import { useTheme } from '../theme';
import { darkModalGradient, lightModalGradient } from '../theme/colors/colors';
import PopperListener from './PopperListener';
import { TooltipIcon } from './TooltipIconButton';

export interface FilterColumn {
  name: string;
  options: { label: string; value: string }[];
}

export interface UniversalFilterProps {
  filters: Record<string, FilterColumn>;
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  variant: 'filled' | 'standard' | 'outlined';
  handleApplyFilter: () => void;
  showAllOption?: boolean;
  id: string;
}

export const FilterHeader = styled('div')(({ theme }) => ({
  background: theme.palette.mode === 'light' ? lightModalGradient.header : darkModalGradient.header,
  padding: '0.75rem 1rem',
  margin: '-1rem -1rem 1rem -1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.text.constant?.white
}));

function UniversalFilter({
  filters,
  selectedFilters,
  setSelectedFilters,
  variant = 'outlined',
  handleApplyFilter,
  showAllOption = true,
  id
}: UniversalFilterProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleFilterChange = (event: React.ChangeEvent<{ value: string }>, columnName: string) => {
    const value = event.target.value;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [columnName]: value
    }));
  };

  const handleApplyOnClick = () => {
    handleClose();
    handleApplyFilter();
  };

  const renderFilterContent = () => (
    <div>
      <FilterHeader>
        <h3>Filters: </h3>
      </FilterHeader>
      {Object.keys(filters).map((filterColumn) => {
        const options = filters[filterColumn].options;
        return (
          <div key={filterColumn} role="presentation">
            <InputLabel id={filters[filterColumn].name}>{filters[filterColumn].name}</InputLabel>
            <Select
              defaultValue="All"
              key={filterColumn}
              value={selectedFilters[filterColumn]}
              variant={variant}
              onChange={(e: SelectChangeEvent<unknown>) =>
                handleFilterChange(e as React.ChangeEvent<{ value: string }>, filterColumn)
              }
              style={{
                width: '20rem',
                marginBottom: '1rem'
              }}
              inputProps={{ 'aria-label': 'Without label' }}
              displayEmpty
            >
              {showAllOption && <MenuItem value="All">All</MenuItem>}
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>
        );
      })}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={handleApplyOnClick}>
          Apply
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div id={id}>
        <TooltipIcon
          title="Filter"
          onClick={handleClick}
          icon={<FilterIcon fill={theme.palette.icon.default} />}
          arrow
        />
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
