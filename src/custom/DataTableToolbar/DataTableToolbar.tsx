import { Box } from '../../base';
import { styled } from '../../theme';
import type { DataTableToolbarProps } from './DataTableToolbar.types';

const ToolbarRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  minHeight: theme.spacing(8),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.background.card,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
  zIndex: 101,

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

export function DataTableToolbar({
  primaryActions,
  secondaryActions,
  search,
  filter,
  columnVisibility,
  viewSwitch,
  sx
}: DataTableToolbarProps): JSX.Element {
  const hasLeftContent = Boolean(primaryActions) || Boolean(secondaryActions);
  const hasRightContent =
    Boolean(filter) || Boolean(search) || Boolean(columnVisibility) || Boolean(viewSwitch);

  return (
    <ToolbarRoot sx={sx}>
      {hasLeftContent && (
        <Section>
          {primaryActions}
          {secondaryActions}
        </Section>
      )}
      {hasRightContent && (
        <Section>
          {filter}
          {search}
          {columnVisibility}
          {viewSwitch}
        </Section>
      )}
    </ToolbarRoot>
  );
}
