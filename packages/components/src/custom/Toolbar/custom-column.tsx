import { ColumnIcon } from '@layer5/sistent-svg';
import React from 'react';
import { IconButton } from '../../base/Button';
import { Checkbox } from '../../base/Checkbox';
import { ClickAwayListener } from '../../base/ClickAwayListener';
import { FormControlLabel } from '../../base/Form';
import { Paper } from '../../base/Paper';
import { Popper } from '../../base/Popper';
import { Tooltip } from '../../base/Tooltip';

interface CustomColumnVisibilityControlProps {
  columns: Column[];
  customToolsProps: {
    columnVisibility: Record<string, boolean>;
    setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  };
  style?: React.CSSProperties;
}

interface Column {
  name: string;
  label: string;
}

function CustomColumnVisibilityControl({
  columns,
  customToolsProps,
  style
}: CustomColumnVisibilityControlProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleColumnVisibilityChange = (columnName: string, isVisible: boolean) => {
    customToolsProps.setColumnVisibility((prevState) => ({
      ...prevState,
      [columnName]: isVisible
    }));
  };

  return (
    <div>
      <Tooltip title="View Columns" arrow>
        <IconButton
          onClick={handleOpen}
          sx={{
            '&:hover': {
              '& svg': {
                fill: '#00d3a9'
              },
              borderRadius: '4px'
            },
            ...style
          }}
          disableRipple
        >
          <ColumnIcon fill="#3c494f" />
        </IconButton>
      </Tooltip>

      <Popper
        open={Boolean(anchorEl)}
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
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              padding: '1rem',
              boxShadow: open ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
              background: '#f4f5f7'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {columns.map((col) => (
                <FormControlLabel
                  key={col.name}
                  control={
                    <Checkbox
                      checked={customToolsProps.columnVisibility[col.name]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleColumnVisibilityChange(col.name, e.target.checked)
                      }
                    />
                  }
                  label={col.label}
                />
              ))}
            </div>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}

export default CustomColumnVisibilityControl;
