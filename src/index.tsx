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

export { DataTableToolbar, type DataTableToolbarProps } from './custom/DataTableToolbar';

// Same nested-barrel dts-drop quirk as FeedbackButton above: reaching the entry
// only through `export * from './custom'`, rollup-plugin-dts drops both the
// `NavigationNavbar` component declaration and the `NavigationItem` type from the
// bundled d.ts, so `import { NavigationNavbar, type NavigationItem } from
// "@sistent/sistent"` fails type-checking despite the runtime exports existing.
// The explicit re-export forces both declarations into the published bundle.
export { NavigationNavbar, type NavigationItem } from './custom/NavigationNavbar';

// Same nested-barrel dts-drop quirk as FeedbackButton above. `createCanShow` is
// worse than a missing type: consumers still resolve it at runtime, so the import
// silently degrades to `any` and its `eventBus` argument stops being
// variance-checked - the one place a host hands its event bus to sistent.
// Its parameter types travel with it: a consumer that cannot name `HasKeyProps`
// or `ReasonEventPublisher` cannot type the wrapper it builds around the
// returned component, and falls straight back to `any`.
export {
  createCanShow,
  type HasKeyProps,
  type InvertAction,
  type ReasonEvent,
  type ReasonEventPublisher
} from './custom/permissions';

export {
  PermissionProvider,
  PermissionSessionContext,
  PermissionShield,
  getPermissionKeys,
  isPermissionKeySet,
  useHasPermission,
  usePermission,
  usePermissionUserContext,
  useUnmetPermissionKeys,
  type Key,
  type PermissionAction,
  type PermissionKeySet,
  type PermissionKeySpec,
  type PermissionProviderProps,
  type PermissionProviderValue,
  type PermissionSessionContextProps,
  type PermissionShieldProps,
  type PermissionUserContext
} from './custom/permissions';

export {
  useAccessibleOrgs,
  type UseAccessibleOrgsOptions,
  type TriggerGetKeys
} from './hooks/useAccessibleOrgs';

export {
  WidgetPicker,
  type WidgetPickerProps,
  type WidgetItem
} from './custom/WidgetPicker';

export {
  WidgetEmptyState,
  type WidgetEmptyStateProps
} from './custom/WidgetEmptyState';

export { BottomSheet, type BottomSheetProps } from './custom/BottomSheet';

export { ActionButton, type ActionButtonProps, type Option } from './custom/ActionButton';

// Same nested-barrel dts-drop quirk as FeedbackButton above. The share/revoke
// payload builders exist so that hosts stop hand-rolling the
// `resourceAccessMappingPayload` body they hand to `ShareModal`'s
// `resourceAccessMutator`: the server drops unrecognised keys silently and
// still answers 200, so a hand-rolled body fails as a successful no-op.
// Without the declarations a host cannot type that body at all and falls back
// to the object literal that caused the bug.
//
// The component is dropped by the same quirk, which left hosts able to type the
// share body but not the component consuming it. This is one instance of a
// wider gap - most of `src/custom/` reaches `dist/index.js` without reaching
// `dist/index.d.ts` - so a per-symbol line here is a stopgap, not the fix.
// AGENTS.md, "New public exports need an explicit root re-export", owns the
// measurement and the command that reproduces it.
//
// Taken from the `./custom/ShareModal` barrel rather than the leaf
// `resourceAccessPayload` module: that barrel re-exports the builders as well
// as the component, so one statement is the single source of truth for where
// all of these come from.
export {
  ResourceAccessActorError,
  ShareModal,
  buildGrantAccessPayload,
  buildRevokeAccessPayload,
  toResourceAccessActors,
  type ResourceAccessActor,
  type ResourceAccessArg,
  type ResourceAccessMappingPayload,
  type ShareModalProps
} from './custom/ShareModal';

// Same nested-barrel dts-drop quirk as FeedbackButton above, and the whole
// `DashboardWidgets` barrel is subject to it - `TeamSearchField` reaches
// `dist/index.js` but not `dist/index.d.ts`, so a host cannot name the
// component at all. Its two prop types travel with it: `teamsData` and
// `setTeamsData` are both keyed on the team-picker record, so a consumer that
// cannot name it cannot hold the state the component requires and falls back
// to `any`. Taken from the leaf module because the barrel re-exports only the
// default. The record is aliased because sistent has a second, wider `Team` -
// the full v1beta2 construct in `custom/Workspaces/types` - and a bare `Team`
// at the root would make which one this is ambiguous.
export {
  default as TeamSearchField,
  type Team as TeamPickerRecord,
  type TeamSearchFieldProps
} from './custom/DashboardWidgets/GettingStartedWidget/TeamSearchField';

// Explicit root re-exports for RJSFFormWrapper, RJSFFormModal, and Sistent RJSF theme
// to ensure rollup-plugin-dts includes their types in dist/index.d.ts.
export {
  RJSFFormModal,
  RJSFFormWrapper,
  hideRootObjectTitle,
  sistentTheme,
  sistentTemplates,
  sistentWidgets,
  generateTheme,
  generateTemplates,
  generateWidgets,
  type RJSFFormModalProps,
  type RJSFFormWrapperProps,
  type RJSFValidationError
} from './custom/RJSFFormWrapper';

