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

// The explicit re-exports below were added to work around what looked like
// rollup-plugin-dts dropping declarations reached through `export * from
// './custom'`. The real cause was `src/custom/` having both an `index.ts` and an
// `index.tsx` barrel, which the runtime and declaration builds resolve in
// opposite orders; with one barrel the `export *` above carries everything, and
// `declarationRuntimeExportParity.test.ts` keeps the two builds in step. They
// stay because some also export names the domain barrels do not (e.g.
// `FeedbackComponentProps`, `TeamPickerRecord`).
export {
  DangerConfirmationModal,
  type DangerConfirmationCheckbox,
  type DangerConfirmationModalProps
} from './custom/DangerConfirmationModal';
export { FeedbackButton, type FeedbackComponentProps } from './custom/Feedback';
export { getCopyDeepLinkAction, type TableAction } from './custom/TableActions';

export { DashboardLayout, type DashboardLayoutProps } from './custom/DashboardLayout';
export {
  default as UniversalFilter,
  type DateRange,
  type FilterColumn,
  type QuickDateRangeOption,
  type UniversalFilterProps
} from './custom/UniversalFilter';

export { DataTableToolbar, type DataTableToolbarProps } from './custom/DataTableToolbar';

export { NavigationNavbar, type NavigationItem } from './custom/NavigationNavbar';

// `createCanShow` takes the host's event bus, so its parameter types travel with
// it: a consumer that cannot name `HasKeyProps` or `ReasonEventPublisher` cannot
// type the wrapper it builds around the returned component, and falls straight
// back to `any`.
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
  type TriggerGetKeys,
  type UseAccessibleOrgsOptions
} from './hooks/useAccessibleOrgs';

export { WidgetPicker, type WidgetItem, type WidgetPickerProps } from './custom/WidgetPicker';

export { WidgetEmptyState, type WidgetEmptyStateProps } from './custom/WidgetEmptyState';

export { BottomSheet, type BottomSheetProps } from './custom/BottomSheet';

export {
  ProgressBar,
  useProgressBar,
  type ProgressBarProps,
  type ProgressBarVariant,
  type ShowProgressBarOptions,
  type UseProgressBarReturn
} from './custom/ProgressBar';

export { ActionButton, type ActionButtonProps, type Option } from './custom/ActionButton';

// The share/revoke payload builders exist so that hosts stop hand-rolling the
// `resourceAccessMappingPayload` body they hand to `ShareModal`'s
// `resourceAccessMutator`: the server drops unrecognised keys silently and
// still answers 200, so a hand-rolled body fails as a successful no-op.
// Without the declarations a host cannot type that body at all and falls back
// to the object literal that caused the bug.
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

// `TeamSearchField`'s two prop types travel with it: `teamsData` and
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
