import { Key } from '@meshery/schemas/permissions';
import React, { createContext, useContext } from 'react';


/**
 * Determines how a component responds when the user lacks the required permission.
 *
 * - `'hide'`       — renders nothing (`null`).
 * - `'showShield'` — disables the component, overlays a shield/lock icon, and
 *                     displays permission metadata in a tooltip.
 */
export type PermissionAction = 'hide' | 'showShield';

/**
 * A set of permission keys combined by an explicit combinator.
 *
 * - `{ anyOf }` — permitted when the user holds *at least one* of the keys.
 *                 This is what a section/parent affordance is gated on: it is
 *                 reachable exactly when at least one of its children is.
 * - `{ allOf }` — permitted when the user holds *every* key.
 *
 * The combinator is always explicit; there is no default combination of a bare
 * list, so a key set can never be read the wrong way round.
 */
export type PermissionKeySet = { anyOf: Key[] } | { allOf: Key[] };

/**
 * Everything a `permissionKey` prop accepts: a single `Key` (the original,
 * unchanged form) or a `PermissionKeySet`.
 */
export type PermissionKeySpec = Key | PermissionKeySet;

/**
 * `true` when `spec` is a key set rather than a bare `Key`.
 *
 * Discriminated on the presence of a combinator property alone, so any value
 * that is not a key set — including every `Key` ever passed today — takes the
 * original single-key path untouched.
 */
export const isPermissionKeySet = (spec: PermissionKeySpec): spec is PermissionKeySet =>
  !!spec && typeof spec === 'object' && ('anyOf' in spec || 'allOf' in spec);

/** A non-empty array of key-shaped values. */
const isKeyList = (value: unknown): value is Key[] =>
  Array.isArray(value) && value.length > 0 && value.every((k) => !!k && typeof k === 'object');

/**
 * The keys named by a spec, in declaration order. A malformed set names none.
 */
export const getPermissionKeys = (spec: PermissionKeySpec): Key[] => {
  if (!isPermissionKeySet(spec)) return [spec];
  const { anyOf, allOf } = spec as { anyOf?: unknown; allOf?: unknown };
  if (anyOf !== undefined && allOf !== undefined) return [];
  const keys = anyOf !== undefined ? anyOf : allOf;
  return isKeyList(keys) ? keys : [];
};

/**
 * Resolve a key set against the host's evaluator.
 *
 * An empty, non-array, or double-combinator set is **denied**, never granted.
 * Supplying a set is an explicit statement that the affordance *is* gated, so a
 * set that cannot be evaluated must not fall through to "permitted" — and note
 * that `[].every(...)` is vacuously `true`, so `{ allOf: [] }` would otherwise
 * silently grant access to everyone.
 */
const resolvePermissionKeySet = (
  set: PermissionKeySet,
  userHasPermission: (key: Key) => boolean
): boolean => {
  const { anyOf, allOf } = set as { anyOf?: unknown; allOf?: unknown };
  if (anyOf !== undefined && allOf !== undefined) return false;
  if (anyOf !== undefined) return isKeyList(anyOf) && anyOf.some((k) => userHasPermission(k));
  return isKeyList(allOf) && allOf.every((k) => userHasPermission(k));
};

/** How a spec's keys combine — used to word the `PermissionShield` tooltip. */
export type PermissionKeyCombinator = 'single' | 'anyOf' | 'allOf';

export const getPermissionKeyCombinator = (spec: PermissionKeySpec): PermissionKeyCombinator => {
  if (!isPermissionKeySet(spec)) return 'single';
  const { anyOf, allOf } = spec as { anyOf?: unknown; allOf?: unknown };
  if (anyOf !== undefined && allOf !== undefined) return 'single';
  return anyOf !== undefined ? 'anyOf' : 'allOf';
};

/**
 * User context displayed inside the PermissionShield tooltip.
 *
 * Passed through the provider so that `PermissionShield` never reads from
 * `sessionStorage` or any other host-specific storage mechanism.
 */
export interface PermissionUserContext {
  userName?: string;
  orgName?: string;
  roleNames?: string[];
}

/**
 * Value exposed by `PermissionContext`.
 */
export interface PermissionProviderValue {
  /**
   * Generic permission evaluator supplied by the host application.
   *
   * Sistent never knows *how* permissions are checked (CASL, server lookup,
   * JWT claim, etc.) — it only calls this function.
   */
  userHasPermission: (key: Key) => boolean;

  /** Optional user context rendered inside the shield tooltip. */
  userContext?: PermissionUserContext;
}


const PermissionContext = createContext<PermissionProviderValue | null>(null);

// Provider

export interface PermissionProviderProps {
  /**
   * A function that returns `true` when the current user holds the given
   * permission key.  The host application is responsible for implementing
   * this — it may delegate to CASL, a server-side API, a JWT claim, etc.
   */
  userHasPermission: (key: Key) => boolean;

  /**
   * Optional user/org/role context displayed inside the `PermissionShield`
   * tooltip.  When omitted the tooltip's user-context section is hidden.
   */
  userContext?: PermissionUserContext;

  children: React.ReactNode;
}

/**
 * `PermissionProvider` — the single integration point between Sistent's
 * permission-aware components and the host application's authorization system.
 *
 * Mount this near the root of the React tree (alongside your theme provider).
 * If no `PermissionProvider` is present, all permission checks default to
 * "permitted" — ensuring full backward compatibility.
 *
 * @example
 * ```tsx
 * // In _app.tsx — CASL adapter (the ONLY place CASL is referenced)
 * import { PermissionProvider } from '@sistent/sistent';
 * import { ability } from '@/utils/can';
 *
 * const userHasPermission = (key) => ability.can(key.id, key.function?.toLowerCase());
 *
 * <PermissionProvider userHasPermission={userHasPermission} userContext={{ userName, orgName, roleNames }}>
 *   {children}
 * </PermissionProvider>
 * ```
 */
export const PermissionProvider: React.FC<PermissionProviderProps> = ({
  userHasPermission,
  userContext,
  children
}) => (
  <PermissionContext.Provider value={{ userHasPermission, userContext }}>
    {children}
  </PermissionContext.Provider>
);

PermissionProvider.displayName = 'PermissionProvider';

// Hooks

/**
 * Access the full `PermissionProviderValue`.
 * Returns `null` when no `PermissionProvider` is mounted.
 */
export const usePermission = (): PermissionProviderValue | null => useContext(PermissionContext);

/**
 * Check whether the current user has a given permission key or key set.
 *
 * Returns `true` when:
 * - No `PermissionProvider` is mounted (backward-compatible default), OR
 * - No `key` is supplied, OR
 * - `userHasPermission(key)` returns `true` for a bare `Key`, OR
 * - the key set is satisfied — `.some(...)` for `anyOf`, `.every(...)` for `allOf`.
 *
 * The no-provider default is unconditional by design: with no provider mounted
 * the host has not wired up authorization at all, so nothing is evaluated and
 * nothing is gated. The empty/malformed-set denial in `resolvePermissionKeySet`
 * applies wherever permissions are actually evaluated.
 */
export const useHasPermission = (key?: PermissionKeySpec): boolean => {
  const ctx = usePermission();
  if (!key || !ctx) return true;
  if (isPermissionKeySet(key)) return resolvePermissionKeySet(key, ctx.userHasPermission);
  return ctx.userHasPermission(key);
};

/**
 * The declared keys the current user does **not** hold, in declaration order.
 *
 * `PermissionShield` uses this to explain *every* reason an affordance is
 * blocked instead of naming one key. With no provider mounted nothing can be
 * evaluated, so every declared key is reported as unmet: the shield only
 * renders once the caller has already decided the affordance is blocked, and
 * the declared keys are then the only explanation available.
 */
export const useUnmetPermissionKeys = (spec?: PermissionKeySpec): Key[] => {
  const ctx = usePermission();
  if (!spec) return [];
  const keys = getPermissionKeys(spec);
  if (!ctx) return keys;
  return keys.filter((key) => !ctx.userHasPermission(key));
};

/**
 * Retrieve the user context supplied to `PermissionProvider`.
 * Used internally by `PermissionShield` to display user/org/role info
 * without reading from `sessionStorage`.
 */
export const usePermissionUserContext = (): PermissionUserContext | undefined => {
  const ctx = usePermission();
  return ctx?.userContext;
};
