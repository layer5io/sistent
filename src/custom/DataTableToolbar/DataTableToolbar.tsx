import { Box, Typography } from '../../base';
import { styled } from '../../theme';
import type { DataTableToolbarProps } from './DataTableToolbar.types';

const ToolbarRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  minHeight: theme.spacing(8),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.card,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],

  [theme.breakpoints.down('sm')]: {
    height: 'auto',
    flexWrap: 'wrap',
    padding: theme.spacing(1),
    gap: theme.spacing(1)
  }
}));

const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}));

const RightSection = styled(Section)({
  marginLeft: 'auto'
});

export function DataTableToolbar({
  primaryActions,
  secondaryActions,
  bulkOperations,
  search,
  filter,
  columnVisibility,
  viewSwitch,
  searchHelperText,
  tabs,
  sx
}: DataTableToolbarProps): JSX.Element {
  const hasLeftContent = Boolean(primaryActions);
  const hasRightContent =
    Boolean(bulkOperations) ||
    Boolean(secondaryActions) ||
    Boolean(filter) ||
    Boolean(search) ||
    Boolean(columnVisibility) ||
    Boolean(viewSwitch);

  return (
    <>
      <ToolbarRoot sx={sx}>
        {hasLeftContent && <Section>{primaryActions}</Section>}
        {hasRightContent && (
          <RightSection>
            {bulkOperations}
            {secondaryActions}
            {search}
            {filter}
            {columnVisibility}
            {viewSwitch}
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
