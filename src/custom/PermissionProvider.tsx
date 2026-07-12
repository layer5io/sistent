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
 * Check whether the current user has a given permission key.
 *
 * Returns `true` when:
 * - No `PermissionProvider` is mounted (backward-compatible default), OR
 * - No `key` is supplied, OR
 * - `userHasPermission(key)` returns `true`.
 */
export const useHasPermission = (key?: Key): boolean => {
  const ctx = usePermission();
  if (!key || !ctx) return true;
  return ctx.userHasPermission(key);
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
