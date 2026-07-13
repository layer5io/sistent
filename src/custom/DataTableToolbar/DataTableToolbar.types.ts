import type { SxProps, Theme } from '@mui/material';

export type ColumnBreakpoint = 'xs' | 's' | 'm' | 'l' | 'xl';

export interface ColumnConfig {
  /** Column field name */
  name: string;
  /** Column display label */
  label: string;
  /**
   * Minimum breakpoint at which this column is visible.
   *
   * Uses the custom breakpoint system from `responsive-column.tsx`,
   * NOT MUI theme breakpoints:
   *   xs = <585px  (always visible at this and all larger widths)
   *   s  = ≥585px
   *   m  = ≥690px
   *   l  = ≥775px
   *   xl = ≥915px
   * All columns visible above 1140px.
   * Defaults to 'xl' when omitted.
   */
  visibleAt?: ColumnBreakpoint;
}

export interface DataTableToolbarProps {
  /** Left side: primary action buttons (Add, Create, Import) */
  primaryActions?: React.ReactNode;

  /** Left side next to primary: secondary actions (Export, bulk delete) */
  secondaryActions?: React.ReactNode;

  /** Right side: bulk action controls (select all, batch delete) */
  bulkOperations?: React.ReactNode;

  /** Right side: SearchBar component */
  search?: React.ReactNode;

  /** Right side: UniversalFilter component */
  filter?: React.ReactNode;

  /** Right side: Column visibility control (custom override when columns prop is also provided) */
  columnVisibility?: React.ReactNode;

  /** Right side: Grid/table view toggle */
  viewSwitch?: React.ReactNode;

  /** Helper text displayed below the search bar (e.g., "Search by name, kind, category") */
  searchHelperText?: string;

  /** Tabs rendered below the toolbar, directly above the table */
  tabs?: React.ReactNode;

  /** Custom styles for migration compatibility */
  sx?: SxProps<Theme>;

  /**
   * Column definitions with breakpoint auto-hide configuration.
   * When provided, enables built-in column visibility control.
   */
  columns?: ColumnConfig[];

  /** Current column visibility state (controlled) */
  columnVisibilityState?: Record<string, boolean>;

  /** Called when column visibility changes from auto-hide or manual toggle */
  onColumnVisibilityChange?: (visibility: Record<string, boolean>) => void;
}
