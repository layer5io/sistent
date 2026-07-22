/**
 * The Meshery host <-> UI extension contract.
 *
 * Meshery UI ("the host") loads extension bundles (Kanvas et al.) at runtime with
 * `@paciolan/remote-component`. Three things cross that boundary:
 *
 *   1. the bundle's export shape (the host reads `module.exports.default`),
 *   2. a bag of injected capabilities the host hands the bundle as `injectProps`,
 *   3. an RxJS event bus both sides publish on.
 *
 * (2) and (3) used to be hand-duplicated string literals in each repo, with the
 * host bus declared as a bare `new EventBus()` — whose type parameter collapses to
 * its constraint, so `publish()` accepted any `{ type: string }`. A rename on
 * either side therefore compiled cleanly on both and failed silently at runtime:
 * the subscriber's `if (event.type === ...)` simply stopped matching and the
 * feature became a no-op with no error, no warning, and no failing test. That is
 * how `OPEN_DESIGN_IN_KANVAS` -> `OPEN_DESIGN_IN_EXTENSION` shipped broken, and
 * how the `capabilitiesRegistry` -> `providerCapabilities` prop rename shipped
 * before it.
 *
 * This module is the single declaration both sides derive from. Typing the host
 * bus as `EventBus<MesheryExtensionEvent>` and deriving every literal from
 * `MESHERY_EXTENSION_EVENT` turns such a rename into a compile error in every
 * consumer instead of a silent runtime no-op.
 *
 * Editing anything in this file is a contract change:
 *   - additive (new event / new capability) -> no version bump needed,
 *   - rename or removal -> bump `MESHERY_EXTENSION_CONTRACT_VERSION` and add the
 *     old name to the deprecated table so already-published bundles keep working.
 *
 * Extension bundles are published artifacts loaded into whichever host version is
 * deployed, so host and extension are never guaranteed to be built from the same
 * commit. Compile-time agreement is necessary but not sufficient — the runtime
 * handshake helpers below exist to make that skew visible rather than silent.
 */
import type { EventBus } from './eventBus';

/**
 * Incremented only when an event or capability is renamed or removed. The host
 * injects this as `contractVersion`; extensions compare it against the value they
 * were built against and surface a loud, actionable mismatch instead of failing
 * feature-by-feature at runtime.
 */
export const MESHERY_EXTENSION_CONTRACT_VERSION = 1;

/* -------------------------------------------------------------------------- */
/* Events: host -> extension                                                   */
/* -------------------------------------------------------------------------- */

export type K8sContextsUpdatedEvent = {
  type: 'K8S_CONTEXTS_UPDATED';
  data: { selectedK8sContexts: string[] };
};

export type OpenViewScopedToDesignEvent = {
  type: 'OPEN_VIEW_SCOPED_TO_DESIGN';
  data: { designId: string; designName: string };
};

export type OpenDesignInExtensionEvent = {
  type: 'OPEN_DESIGN_IN_EXTENSION';
  data: { designId: string; designName: string };
};

export type OpenViewInExtensionEvent = {
  type: 'OPEN_VIEW_IN_EXTENSION';
  data: { viewId: string; viewName: string };
};

export type MergeDesignEvent = {
  type: 'MERGE_DESIGN';
  data: { id: string; name: string };
};

/* -------------------------------------------------------------------------- */
/* Events: extension -> host                                                   */
/* -------------------------------------------------------------------------- */

export type DispatchToMesheryStoreEvent = {
  type: 'DISPATCH_TO_MESHERY_STORE';
  data: { type: string; payload?: Record<string, unknown> };
};

export type FeatureRequiresUserAccountEvent = {
  type: 'FeatureRequiresUserAccount';
  data: { feature: string };
};

/* -------------------------------------------------------------------------- */
/* Events: published by sistent's PermissionShield onto whichever bus it is     */
/* handed, which in Meshery is the host <-> extension bus.                      */
/* -------------------------------------------------------------------------- */

export type MissingPermissionReason = {
  type: 'MISSING_PERMISSION';
  data: { keyId: string };
};

export type MissingCapabilityReason = {
  type: 'MISSING_CAPABILITY';
  data: { capabilityId: string };
};

/** Every event that may legitimately appear on the host <-> extension bus. */
export type MesheryExtensionEvent =
  | K8sContextsUpdatedEvent
  | OpenViewScopedToDesignEvent
  | OpenDesignInExtensionEvent
  | OpenViewInExtensionEvent
  | MergeDesignEvent
  | DispatchToMesheryStoreEvent
  | FeatureRequiresUserAccountEvent
  | MissingPermissionReason
  | MissingCapabilityReason;

/**
 * The bus type both the host and every extension must use. Declaring the host bus
 * as `new EventBus()` (no type argument) silently widens `T` to its constraint and
 * disables all publish-site checking — always use this alias.
 */
export type MesheryExtensionEventBus = EventBus<MesheryExtensionEvent>;

/**
 * Named handles for every event literal. Publish and subscribe sites reference
 * these rather than inline strings so a rename here breaks compilation at every
 * call site in every repo.
 */
export const MESHERY_EXTENSION_EVENT = {
  K8sContextsUpdated: 'K8S_CONTEXTS_UPDATED',
  OpenViewScopedToDesign: 'OPEN_VIEW_SCOPED_TO_DESIGN',
  OpenDesignInExtension: 'OPEN_DESIGN_IN_EXTENSION',
  OpenViewInExtension: 'OPEN_VIEW_IN_EXTENSION',
  MergeDesign: 'MERGE_DESIGN',
  DispatchToMesheryStore: 'DISPATCH_TO_MESHERY_STORE',
  FeatureRequiresUserAccount: 'FeatureRequiresUserAccount',
  MissingPermission: 'MISSING_PERMISSION',
  MissingCapability: 'MISSING_CAPABILITY'
} as const satisfies Record<string, MesheryExtensionEvent['type']>;

export type MesheryExtensionEventType = MesheryExtensionEvent['type'];

/**
 * Compile-time completeness guard. Adding a member to `MesheryExtensionEvent`
 * without adding it to `MESHERY_EXTENSION_EVENT` makes this assignment fail, so
 * the map can never drift behind the union it describes.
 */
type UnmappedEventType = Exclude<
  MesheryExtensionEventType,
  (typeof MESHERY_EXTENSION_EVENT)[keyof typeof MESHERY_EXTENSION_EVENT]
>;
const _everyEventIsMapped: UnmappedEventType extends never ? true : never = true;
void _everyEventIsMapped;

/** Every event literal, for runtime membership checks. */
export const MESHERY_EXTENSION_EVENT_TYPES = Object.values(
  MESHERY_EXTENSION_EVENT
) as readonly MesheryExtensionEventType[];

/**
 * Narrows an event received from the bus to a known contract member.
 *
 * Subscribers must treat a `false` result as a defect to report, not as something
 * to ignore: it means the publisher is emitting a literal this build has never
 * heard of, which is exactly the host/extension skew that used to present as a
 * silently dead feature.
 */
export const isMesheryExtensionEvent = (event: unknown): event is MesheryExtensionEvent =>
  typeof event === 'object' &&
  event !== null &&
  MESHERY_EXTENSION_EVENT_TYPES.includes((event as { type: MesheryExtensionEventType }).type);

/* -------------------------------------------------------------------------- */
/* Injected capabilities                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Keys the host is expected to place on `injectProps`. Extensions read these off
 * the injected bag; a key the host stops providing resolves to `undefined` at
 * every use site, which historically surfaced as an unrelated React crash far
 * from the actual cause.
 */
export const MESHERY_EXTENSION_CAPABILITIES = [
  'CreateModelModal',
  'DeployStepper',
  'DryRunDesign',
  'ExportModal',
  'GenericRJSFModal',
  'ImportModelModal',
  'InfoModal',
  'MesheryPerformanceComponent',
  'PatternServiceFormCore',
  'ProviderUiAccessControlClass',
  'RJSForm',
  'RelationshipEvaluationResponseFormatter',
  'SetCurrentLoadedResourceInOrgWorkspaceSession',
  'StructuredDataFormatter',
  'ThemeTogglerCore',
  'TypingFilter',
  'UnDeployStepper',
  'ValidateDesign',
  'ViewInfoModal',
  '_PromptComponent',
  'currentOrganization',
  'designValidationMachine',
  'hooks',
  'mesheryEventBus',
  'mesheryStore',
  'openRegistryModal',
  'openWorkspaceModal',
  'providerCapabilities',
  'selectedK8sContexts',
  'useNotificationHook'
] as const;

export type MesheryExtensionCapability = (typeof MESHERY_EXTENSION_CAPABILITIES)[number];

/** Keys expected on the nested `injectProps.hooks` bag. */
export const MESHERY_EXTENSION_HOOKS = [
  'CAN',
  'useDynamicComponent',
  'useFilterK8sContexts'
] as const;

export type MesheryExtensionHook = (typeof MESHERY_EXTENSION_HOOKS)[number];

/**
 * Capability keys the host still injects purely so extension bundles published
 * against an older contract keep mounting. New code must read the replacement.
 * The host is expected to keep supplying these until the corresponding bundles
 * age out; dropping one is a breaking contract change.
 */
export const MESHERY_EXTENSION_DEPRECATED_CAPABILITIES = {
  capabilitiesRegistry: 'providerCapabilities',
  CapabilitiesRegistryClass: 'ProviderUiAccessControlClass',
  resolver: null
} as const satisfies Record<string, MesheryExtensionCapability | null>;

export type DeprecatedMesheryExtensionCapability =
  keyof typeof MESHERY_EXTENSION_DEPRECATED_CAPABILITIES;

/**
 * Fields the host puts on `injectProps` that describe the contract itself rather
 * than providing a capability. They are neither required of the host nor useful
 * to report as unknown - listing the host's own handshake field as an
 * unrecognized key is exactly the kind of noise that teaches maintainers to
 * ignore the report.
 */
export const MESHERY_EXTENSION_HANDSHAKE_FIELDS = ['contractVersion'] as const;

/** Outcome of comparing a host's `injectProps` against the declared contract. */
export type InjectedCapabilityReport = {
  /** Contract keys the host did not provide. Each one is a dead feature. */
  missing: MesheryExtensionCapability[];
  /** Contract hook keys absent from `injectProps.hooks`. */
  missingHooks: MesheryExtensionHook[];
  /** Deprecated keys the host still provides, mapped to their replacement. */
  deprecated: { provided: string; replacement: string | null }[];
  /**
   * Keys the host provides that this build has never heard of. Usually benign
   * (a newer host), but it is the signal that this bundle predates the host and
   * may be missing behaviour the host expects it to have.
   */
  unrecognized: string[];
};

/**
 * Compares a host-supplied `injectProps` bag against the declared contract.
 *
 * Kept side-effect free so both sides can use it: the host asserts on it in a
 * unit test (catching a prop rename before merge) and extensions run it at mount
 * (catching deploy-time host/extension skew, which no CI gate can observe).
 */
export const reportInjectedCapabilities = (
  injectProps: Record<string, unknown> | null | undefined
): InjectedCapabilityReport => {
  const provided = injectProps ?? {};
  const providedKeys = Object.keys(provided);
  const hooks = (provided.hooks ?? {}) as Record<string, unknown>;

  const known = new Set<string>([
    ...MESHERY_EXTENSION_CAPABILITIES,
    ...MESHERY_EXTENSION_HANDSHAKE_FIELDS,
    ...Object.keys(MESHERY_EXTENSION_DEPRECATED_CAPABILITIES)
  ]);

  return {
    missing: MESHERY_EXTENSION_CAPABILITIES.filter(key => provided[key] === undefined),
    // `hooks` itself being absent is already reported as a missing capability;
    // reporting all three hooks again would be noise, so only look inside when
    // the bag is actually there.
    missingHooks:
      provided.hooks === undefined
        ? []
        : MESHERY_EXTENSION_HOOKS.filter(hook => hooks[hook] === undefined),
    deprecated: Object.entries(MESHERY_EXTENSION_DEPRECATED_CAPABILITIES)
      .filter(([key]) => provided[key] !== undefined)
      .map(([provided_, replacement]) => ({ provided: provided_, replacement })),
    unrecognized: providedKeys.filter(key => !known.has(key))
  };
};

/**
 * True when the host satisfied every declared capability. Deprecated and
 * unrecognized keys are informational and do not fail the check — only an
 * outright missing capability is a broken contract.
 */
export const isInjectedCapabilityReportSatisfied = (report: InjectedCapabilityReport): boolean =>
  report.missing.length === 0 && report.missingHooks.length === 0;

/**
 * Renders a report as a single actionable message naming the offending keys.
 * Returns `null` when the contract is satisfied so callers can log unconditionally.
 */
export const describeInjectedCapabilityReport = (
  report: InjectedCapabilityReport
): string | null => {
  if (isInjectedCapabilityReportSatisfied(report)) return null;

  const parts: string[] = [];
  if (report.missing.length > 0) {
    parts.push(`missing capabilities: ${report.missing.join(', ')}`);
  }
  if (report.missingHooks.length > 0) {
    parts.push(`missing hooks: ${report.missingHooks.join(', ')}`);
  }
  return (
    `Meshery host did not satisfy the extension contract (v${MESHERY_EXTENSION_CONTRACT_VERSION}) — ` +
    `${parts.join('; ')}. The host and this extension bundle were built against ` +
    'different contract versions; features depending on these keys will not work.'
  );
};
