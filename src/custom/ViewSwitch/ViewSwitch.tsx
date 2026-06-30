import React from 'react';
import { IconButton } from '../../base/IconButton';
import { GridOnIcon } from '../../icons/GridOn';
import { TableChartIcon } from '../../icons/TableChart';
import { useTheme } from '../../theme';
import { CustomTooltip } from '../CustomTooltip';

export type ViewMode = 'grid' | 'table';

export interface ViewSwitchProps {
  // The current active view mode.
  view: ViewMode;
  // Callback invoked with the next view mode when the user clicks the toggle.
  changeView: (nextView: ViewMode) => void;
  // Optional additional styles for the icon button.
  style?: React.CSSProperties;
  // If true, the switch is disabled.
  disabled?: boolean;
  // Optional custom aria-label for the button.
  ariaLabel?: string;
  // Optional custom tooltip for the grid view icon (shown when in table view).
  gridViewTooltip?: string;
  // Optional custom tooltip for the table view icon (shown when in grid view).
  tableViewTooltip?: string;
}

function ViewSwitch({
  view,
  changeView,
  style,
  disabled = false,
  ariaLabel = 'Switch View',
  gridViewTooltip = 'Grid View',
  tableViewTooltip = 'Table View'
}: ViewSwitchProps): JSX.Element {
  const theme = useTheme();
  const isGrid = view === 'grid';
  const tooltipTitle = isGrid ? tableViewTooltip : gridViewTooltip;

  return (
    <CustomTooltip title={tooltipTitle}>
      <span>
        <IconButton
          size="small"
          disabled={disabled}
          onClick={() => {
            changeView(isGrid ? 'table' : 'grid');
          }}
          aria-label={ariaLabel}
          sx={{ ...style }}
        >
          {isGrid ? (
            <TableChartIcon style={{ color: theme.palette.icon.default }} />
          ) : (
            <GridOnIcon style={{ color: theme.palette.icon.default }} />
          )}
        </IconButton>
      </span>
    </CustomTooltip>
  );
}

export default ViewSwitch;

