import React from 'react';
import { Box } from '../../base/Box';
import { Card } from '../../base/Card';
import { Checkbox } from '../../base/Checkbox';
import { ClickAwayListener } from '../../base/ClickAwayListener';
import { FormControlLabel } from '../../base/FormControlLabel';
import { ColumnIcon } from '../../icons';
import { useTheme } from '../../theme';
import PopperListener from '../PopperListener';
import TooltipIcon from '../TooltipIcon';

export interface CustomColumnVisibilityControlProps {
  columns: CustomColumn[];
  customToolsProps: {
    columnVisibility: Record<string, boolean>;
    setColumnVisibility: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  };
  style?: React.CSSProperties;
  id: string;
}

export interface CustomColumn {
  name: string;
  label: string;
}

export function CustomColumnVisibilityControl({
  columns,
  id,
  customToolsProps,
  style
}: CustomColumnVisibilityControlProps): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();

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
    <React.Fragment>
      <div id={id}>
        <TooltipIcon
          title="View Columns"
          onClick={handleOpen}
          icon={<ColumnIcon fill={theme.palette.icon.default} />}
          arrow
        />
        <PopperListener
          style={style}
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
          // transition
        >
          <Box>
            <ClickAwayListener onClickAway={handleClose}>
              <div>
                <Card
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1rem',
                    boxShadow: open ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                    background: theme.palette.background.surfaces
                  }}
                >
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
                </Card>
              </div>
            </ClickAwayListener>
          </Box>
        </PopperListener>
      </div>
    </React.Fragment>
  );
}

export default CustomColumnVisibilityControl;
