import { Key } from '@meshery/schemas/permissions';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getPermissionKeys, isPermissionKeySet, PermissionKeySpec } from '../custom/PermissionProvider';

/**
 * For a given set of user keys (as returned by `getUserKeys`), check whether
 * the `permissionKey` spec is satisfied.
 *
 * Uses case-insensitive comparison on the `function` field, matching the
 * `canKey` pattern in host applications.
 */
const orgHasPermission = (
  orgKeys: Array<{ id: string; function: string }>,
  spec: PermissionKeySpec
): boolean => {
  const userHasKey = (key: Key) =>
    orgKeys.some(
      (k) => k.id === key.id && k.function?.toLowerCase() === key.function?.toLowerCase()
    );

  if (!isPermissionKeySet(spec)) {
    return userHasKey(spec);
  }

  const keys = getPermissionKeys(spec);
  if (keys.length === 0) return false;

  const specObj = spec as { anyOf?: Key[] };
  if ('anyOf' in specObj) {
    return keys.some(userHasKey);
  }
  return keys.every(userHasKey);
};

/** Type guard: narrows any object with an optional `id` to one with a definite `id`. */
const hasDefiniteId = <T extends { id?: string }>(org: T): org is T & { id: string } =>
  Boolean(org.id);

/**
 * The shape of the trigger function returned by RTK Query's
 * `useLazyGetUserKeysQuery`. Both `cloudApi` and `mesheryApi` export one
 * with the same signature — callers pass whichever is appropriate.
 */
export type TriggerGetKeys = (
  arg: { orgId: string }
) => { unwrap: () => Promise<{ keys?: Array<{ id: string; function: string }> }> };

/**
 * Configuration for `useAccessibleOrgs`.
 *
 * The hook does NOT read orgs, the current org, or the keys endpoint from any
 * global store — all are supplied by the host application so the hook stays
 * framework-agnostic.
 *
 * Generic over `T` so the element type of `allOrgs` flows through to
 * `accessibleOrgs` — callers keep `org.name`, `org.avatar`, etc. typed.
 */
export interface UseAccessibleOrgsOptions<T extends { id?: string } = { id?: string }> {
  /** All organizations the user belongs to (e.g. from `useGetOrgsQuery`). */
  allOrgs?: T[];

  /** The id of the organization the user is currently in. Excluded from results. */
  currentOrgId?: string;

  /** Whether the org list has finished loading. */
  orgsLoaded: boolean;

  /** The permission key (or key set) to check each org against. */
  permissionKey?: PermissionKeySpec;

  /**
   * The lazy trigger returned by RTK Query's `useLazyGetUserKeysQuery`.
   *
   * - meshery-cloud passes the one from `@meshery/schemas/cloudApi`
   * - meshery passes the one from `@meshery/schemas/mesheryApi`
   *
   * This avoids hardcoding a transport layer so the same logic works in both.
   */
  triggerGetKeys: TriggerGetKeys;
}

/**
 * Returns only those organizations where the user holds the permission(s)
 * described by `permissionKey`. The current org is excluded from the result
 * since the user is already on the 403 page for it.
 *
 * Queries `/api/identity/orgs/:orgId/users/keys` for each org in parallel.
 * This is a 403-page-only hook — the N parallel requests are acceptable
 * because this page is not a hot path.
 *
 * @example
 * ```tsx
 * // In meshery-cloud
 * const [triggerGetKeys] = useLazyGetUserKeysQuery(); // from cloudApi
 * const { accessibleOrgs, isLoading } = useAccessibleOrgs({
 *   allOrgs,
 *   currentOrgId: currentOrg?.id,
 *   orgsLoaded: isSuccess,
 *   permissionKey,
 *   triggerGetKeys,
 * });
 *
 * // In meshery
 * const [triggerGetKeys] = useLazyGetUserKeysQuery(); // from mesheryApi
 * const { accessibleOrgs, isLoading } = useAccessibleOrgs({
 *   allOrgs,
 *   currentOrgId: selectedOrg?.id,
 *   orgsLoaded: !isLoading,
 *   permissionKey,
 *   triggerGetKeys,
 * });
 * ```
 */
export const useAccessibleOrgs = <T extends { id?: string }>({
  allOrgs,
  currentOrgId,
  orgsLoaded,
  permissionKey,
  triggerGetKeys
}: UseAccessibleOrgsOptions<T>) => {
  // Track which orgs have been checked and their results.
  // Map<orgId, hasPermission>
  const [checkedOrgs, setCheckedOrgs] = useState<Map<string, boolean>>(new Map());
  const [isChecking, setIsChecking] = useState(false);

  // Stable ref to avoid re-triggering the effect on every state update
  const checkedRef = useRef<Set<string>>(new Set());

  // Reset caches when the permission requirement changes so stale results
  // from a previous key are never served.
  useEffect(() => {
    checkedRef.current.clear();
    setCheckedOrgs(new Map());
  }, [permissionKey]);

  const checkOrgs = useCallback(async () => {
    if (!allOrgs || !orgsLoaded || !permissionKey) return;

    // Only check orgs we haven't already checked
    const orgsToCheck = allOrgs
      .filter(hasDefiniteId)
      .filter((org) => org.id !== currentOrgId && !checkedRef.current.has(org.id));

    if (orgsToCheck.length === 0) return;

    setIsChecking(true);

    // Mark these as being checked to prevent duplicate requests
    orgsToCheck.forEach((org) => checkedRef.current.add(org.id));

    // Fire all queries in parallel
    const results = await Promise.allSettled(
      orgsToCheck.map(async (org) => {
        const result = await triggerGetKeys({ orgId: org.id }).unwrap();
        const keys = result?.keys ?? [];
        return { orgId: org.id, hasPermission: orgHasPermission(keys, permissionKey) };
      })
    );

    setCheckedOrgs((prev) => {
      const next = new Map(prev);
      for (const [index, r] of results.entries()) {
        const orgId = orgsToCheck[index].id;
        if (r.status === 'fulfilled') {
          next.set(orgId, r.value.hasPermission);
        } else {
          // On failure, record as inaccessible so isReady can still resolve
          next.set(orgId, false);
        }
      }
      return next;
    });

    setIsChecking(false);
  }, [allOrgs, orgsLoaded, permissionKey, currentOrgId, triggerGetKeys]);

  useEffect(() => {
    checkOrgs();
  }, [checkOrgs]);

  const accessibleOrgs = useMemo(() => {
    if (!allOrgs) return [];
    return allOrgs
      .filter(hasDefiniteId)
      .filter((org) => org.id !== currentOrgId && checkedOrgs.get(org.id) === true);
  }, [allOrgs, currentOrgId, checkedOrgs]);

  const otherOrgs = (allOrgs ?? [])
    .filter(hasDefiniteId)
    .filter((org) => org.id !== currentOrgId);

  const isReady = orgsLoaded && !isChecking && otherOrgs.every((org) => checkedOrgs.has(org.id));

  return {
    accessibleOrgs,
    isReady,
    isLoading: !orgsLoaded || isChecking,
    hasNoAccessibleOrgs: isReady && accessibleOrgs.length === 0
  };
};
