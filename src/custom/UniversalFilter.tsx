import { useTheme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { Button } from '../base/Button';
import { ClickAwayListener } from '../base/ClickAwayListener';
import { InputLabel } from '../base/InputLabel';
import { MenuItem } from '../base/MenuItem';
import { Paper } from '../base/Paper';
import { Select } from '../base/Select';
import { FilterIcon } from '../icons';
import PopperListener from './PopperListener';
import TooltipIcon from './TooltipIcon';

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

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const idx = canBeOpen ? 'transition-popper' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div id={id}>
        <TooltipIcon
          title="Filter"
          onClick={handleClick}
          icon={<FilterIcon fill={theme.palette.icon.default} />}
          arrow
        />
        <PopperListener
          id={idx}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          // transition
        >
          <div>
            <ClickAwayListener
              onClickAway={handleClose}
              mouseEvent="onMouseDown"
              touchEvent="onTouchStart"
            >
              <div>
                <Paper
                  sx={{
                    padding: '1rem',
                    paddingTop: '1.8rem',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: theme.palette.background.surfaces
                  }}
                >
                  {Object.keys(filters).map((filterColumn) => {
                    const options = filters[filterColumn].options;
                    return (
                      <div key={filterColumn} role="presentation">
                        <InputLabel id={filters[filterColumn].name}>
                          {filters[filterColumn].name}
                        </InputLabel>
                        <Select
                          defaultValue="All"
                          key={filterColumn}
                          value={selectedFilters[filterColumn]}
                          variant={variant}
                          onChange={(e: SelectChangeEvent<unknown>) =>
                            handleFilterChange(
                              e as React.ChangeEvent<{ value: string }>,
                              filterColumn
                            )
                          }
                          style={{
                            width: '15rem',
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

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleApplyOnClick}>
                      Apply
                    </Button>
                  </div>
                </Paper>
              </div>
            </ClickAwayListener>
          </div>
        </PopperListener>
      </div>
    </React.Fragment>
  );
}
export default UniversalFilter;
