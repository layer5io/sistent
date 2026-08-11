import React from 'react';
import { Box, Card, Checkbox, ClickAwayListener, FormControlLabel, Typography } from '../../base';
import { ColumnIcon } from '../../icons/Column';
import { styled, useTheme } from '../../theme';
import type { ColView } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx';
import { updateVisibleColumns } from '../Helpers/ResponsiveColumns/responsive-coulmns.tsx';
import { PopperListener } from '../PopperListener';
import { TooltipIcon } from '../TooltipIconButton';
import { useWindowDimensions } from '../Helpers/Dimension';
import type { DataTableToolbarProps } from './DataTableToolbar.types';

const ToolbarRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  minHeight: theme.spacing(8),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.card,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],

  [theme.breakpoints.down('sm')]: {
    flexWrap: 'nowrap',
    padding: theme.spacing(1),
    gap: theme.spacing(1)
  }
}));

const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  minWidth: 0
}));

const RightSection = styled(Section)(({ theme }) => ({
  marginLeft: 'auto',
  flexWrap: 'nowrap',
  flexShrink: 1,
  minWidth: 0,
  justifyContent: 'flex-end',

  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(1)
  }
}));

const RightControlsGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 1,
  minWidth: 0,
  gap: theme.spacing(1)
}));

const SearchSlot = styled(Box)({
  flex: '0 1 auto',
  minWidth: 0,
  maxWidth: '15rem'
});

const TrailingControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: theme.spacing(1)
}));

export function DataTableToolbar({
  primaryActions,
  secondaryActions,
  bulkOperations,
  search,
  filter,
  columnVisibility,
  viewSwitch,
  compactTrailing,
  searchHelperText,
  tabs,
  columns,
  columnVisibilityState,
  onColumnVisibilityChange,
  sx
}: DataTableToolbarProps): JSX.Element {
  const theme = useTheme();
  const { width: viewportWidth } = useWindowDimensions();
  const isNarrowViewport =
    viewportWidth > 0 && viewportWidth < theme.breakpoints.values.sm;
  const effectiveCompactTrailing = compactTrailing ?? isNarrowViewport;

  // Compute auto-hide visibility from columns config + viewport width
  const autoHideVisibility = React.useMemo(() => {
    if (!columns) return {};
    const colViews: ColView[] = columns.map((col) => [col.name, col.visibleAt || 'xl']);
    return updateVisibleColumns(colViews, viewportWidth);
  }, [columns, viewportWidth]);

  // Merged visibility: controlled state wins, else computed defaults
  const effectiveVisibility = columnVisibilityState ?? autoHideVisibility;

  // Built-in column visibility dropdown state
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleColumnToggle = (colName: string, checked: boolean) => {
    if (onColumnVisibilityChange) {
      onColumnVisibilityChange({
        ...effectiveVisibility,
        [colName]: checked
      });
    }
  };

  const handleOpenDropdown = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleCloseDropdown = () => {
    setAnchorEl(null);
    setDropdownOpen(false);
  };

  // Determine what column visibility control to render
  // columns prop takes priority over columnVisibility slot
  const columnControl = columns ? (
    <>
      <TooltipIcon
        title="View Columns"
        onClick={handleOpenDropdown}
        icon={<ColumnIcon fill={theme.palette.icon.default} />}
        arrow
      />
      <PopperListener
        open={dropdownOpen}
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
      >
        <ClickAwayListener onClickAway={handleCloseDropdown}>
          <div>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                boxShadow: dropdownOpen ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
                background: theme.palette.background.surfaces
              }}
            >
              {columns.map((col) => (
                <FormControlLabel
                  key={col.name}
                  control={
                    <Checkbox
                      checked={effectiveVisibility[col.name] ?? true}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleColumnToggle(col.name, e.target.checked)
                      }
                    />
                  }
                  label={col.label}
                />
              ))}
            </Card>
          </div>
        </ClickAwayListener>
      </PopperListener>
    </>
  ) : (
    columnVisibility
  );

  const trailingControls = (
    <>
      {filter}
      {columnControl}
      {viewSwitch}
    </>
  );

  const hasTrailingControls =
    !effectiveCompactTrailing &&
    (Boolean(filter) || Boolean(columnControl) || Boolean(viewSwitch));

  const hasLeftContent = Boolean(primaryActions);
  const hasRightContent =
    Boolean(bulkOperations) ||
    Boolean(secondaryActions) ||
    Boolean(search) ||
    hasTrailingControls;

  return (
    <>
      <ToolbarRoot data-testid="data-table-toolbar" sx={sx}>
        {hasLeftContent && <Section data-testid="data-table-toolbar-left-section">{primaryActions}</Section>}
        {hasRightContent && (
          <RightSection data-testid="data-table-toolbar-right-section">
            {bulkOperations}
            {secondaryActions}
            {(search || hasTrailingControls) && (
              <RightControlsGroup data-testid="data-table-toolbar-right-controls">
                {search && <SearchSlot>{search}</SearchSlot>}
                {hasTrailingControls && (
                  <TrailingControls data-testid="data-table-toolbar-trailing-controls">
                    {trailingControls}
                  </TrailingControls>
                )}
              </RightControlsGroup>
            )}
          </RightSection>
        )}
      </ToolbarRoot>
      {searchHelperText && (
        <Typography variant="caption" color="textSecondary">
          {searchHelperText}
        </Typography>
      )}
      {tabs && <Box sx={{ mt: 2 }}>{tabs}</Box>}
    </>
  );
}
