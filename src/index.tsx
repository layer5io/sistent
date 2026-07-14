export * from './actors';
export * from './base';
export * from './colors';
export * from './custom';
export * from './hooks';
export * from './icons';
export * from './redux-persist';
export * from './schemas';
export * from './theme';
export * from './utils';

// FeedbackButton's type is dropped from the bundled d.ts when it reaches the
// entry only through `export * from './custom'`: rollup-plugin-dts (used by
// tsup for the declaration bundle) fails to propagate certain re-exports
// through nested barrels, so `import { FeedbackButton } from "@sistent/sistent"`
// fails type-checking even though the runtime export exists. An explicit
// re-export forces the declaration into the published bundle. The same quirk
// affects other custom components (see consumers' local d.ts augmentations);
// add them here as they are needed.
export { FeedbackButton, type FeedbackComponentProps } from './custom/Feedback';
// `TableAction` and `getCopyDeepLinkAction` live in the leaf `TableActions`
// module (not `ResponsiveDataTable`, which imports the untyped
// `@sistent/mui-datatables` and would crash the dts build) precisely so this
// explicit re-export can force them into the published declaration bundle.
export { getCopyDeepLinkAction, type TableAction } from './custom/TableActions';
// Same nested-barrel dts-drop quirk as FeedbackButton above: without this
// explicit re-export the DangerConfirmationModal declarations (and its exported
// props types) are dropped from the bundled d.ts, breaking
// `import { DangerConfirmationModal } from "@sistent/sistent"` type-checking.
export {
  DangerConfirmationModal,
  type DangerConfirmationCheckbox,
  type DangerConfirmationModalProps
} from './custom/DangerConfirmationModal';

export {
  DashboardLayout,
  type DashboardLayoutProps
} from './custom/DashboardLayout';
// Same nested-barrel dts-drop quirk as FeedbackButton above: UniversalFilter
// (and its FilterColumn / UniversalFilterProps types) reaches the entry only
// through `export * from './custom'`, so rollup-plugin-dts drops it from the
// bundled d.ts and `import { UniversalFilter } from "@sistent/sistent"` fails
// type-checking despite the runtime export. The explicit re-export forces the
// declaration into the published bundle.
export {
  default as UniversalFilter,
  type DateRange,
  type FilterColumn,
  type QuickDateRangeOption,
  type UniversalFilterProps
} from './custom/UniversalFilter';

export {
  PermissionProvider,
  PermissionShield,
  usePermission,
  useHasPermission,
  usePermissionUserContext,
  type Key,
  type PermissionAction,
  type PermissionProviderProps,
  type PermissionProviderValue,
  type PermissionShieldProps,
  type PermissionUserContext
} from './custom/permissions';

export {
  WidgetPicker,
  type WidgetPickerProps,
  type WidgetItem
} from './custom/WidgetPicker';
