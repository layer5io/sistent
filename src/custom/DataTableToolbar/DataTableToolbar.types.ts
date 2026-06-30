import type { SxProps, Theme } from '@mui/material';

export interface DataTableToolbarProps {
  /** Left side: primary action buttons (Add, Create, Import) */
  primaryActions?: React.ReactNode;

  /** Left side next to primary: secondary actions (Export, bulk delete) */
  secondaryActions?: React.ReactNode;

  /** Right side: SearchBar component */
  search?: React.ReactNode;

  /** Right side: UniversalFilter component */
  filter?: React.ReactNode;

  /** Right side: Column visibility control */
  columnVisibility?: React.ReactNode;

  /** Right side: Grid/table view toggle */
  viewSwitch?: React.ReactNode;

  /** Custom styles for migration compatibility */
  sx?: SxProps<Theme>;
}
