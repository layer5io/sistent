import { FilterIcon } from '@layer5/sistent-svg';
import { SelectChangeEvent } from '@mui/material/Select';
import React from 'react';
import { Button } from '../../base/Button';
import { ClickAwayListener } from '../../base/ClickAwayListener';
import { IconButton } from '../../base/IconButton';
import { InputLabel } from '../../base/InputLabel';
import { MenuItem } from '../../base/Menu';
import { Paper } from '../../base/Paper';
import { Popper } from '../../base/Popper';
import { Select } from '../../base/Select';
import { Tooltip } from '../../base/Tooltip';

interface FilterColumn {
  name: string;
  options: { label: string; value: string }[];
}

interface UniversalFilterProps {
  filters: Record<string, FilterColumn>;
  selectedFilters: Record<string, string>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleApplyFilter: () => void;
  showAllOption?: boolean;
}

function UniversalFilter({
  filters,
  selectedFilters,
  setSelectedFilters,
  handleApplyFilter,
  showAllOption = true
}: UniversalFilterProps): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

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
  const id = canBeOpen ? 'transition-popper' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Filter" arrow>
        <IconButton
          onClick={handleClick}
          sx={{
            '&:hover': {
              '& svg': {
                fill: '#00d3a9'
              }
            }
          }}
          disableRipple
        >
          <FilterIcon fill="#3c494f" />
        </IconButton>
      </Tooltip>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        modifiers={[
          {
            name: 'flip',
            options: {
              enabled: false
            }
          },
          {
            name: 'preventOverflow',
            options: {
              enabled: true,
              boundariesElement: 'scrollParent'
            }
          }
        ]}
        transition
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
              backgroundColor: '#f4f5f7'
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
                    onChange={(e: SelectChangeEvent<unknown>) =>
                      handleFilterChange(e as React.ChangeEvent<{ value: string }>, filterColumn)
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
        </ClickAwayListener>
      </Popper>
    </div>
  );
}
export default UniversalFilter;
