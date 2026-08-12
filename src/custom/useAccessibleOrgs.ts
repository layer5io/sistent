import { useLazyGetUserKeysQuery } from '@meshery/schemas/cloudApi';
import { Key } from '@meshery/schemas/permissions';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getPermissionKeys, isPermissionKeySet, PermissionKeySpec } from './PermissionProvider';

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
 * Configuration for `useAccessibleOrgs`.
 *
 * The hook does NOT read orgs or the current org from any global store — both
 * are supplied by the host application so the hook stays framework-agnostic.
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
}

/**
 * Returns only those organizations where the user holds the permission(s)
 * described by `permissionKey`. The current org is excluded from the result
 * since the user is already on the 403 page for it.
 *
 * Queries `/api/identity/orgs/:orgId/users/keys` for each org in parallel
 * via `useLazyGetUserKeysQuery`. This is a 403-page-only hook — the N
 * parallel requests are acceptable because this page is not a hot path.
 *
 * @example
 * ```tsx
 * // In meshery-cloud
 * const { data: allOrgs, isSuccess } = useGetActiveOrgs();
 * const currentOrg = useSelector(selectCurrentOrg);
 * const { accessibleOrgs, isLoading } = useAccessibleOrgs({
 *   allOrgs,
 *   currentOrgId: currentOrg?.id,
 *   orgsLoaded: isSuccess,
 *   permissionKey,
 * });
 * ```
 */
export const useAccessibleOrgs = <T extends { id?: string }>({
  allOrgs,
  currentOrgId,
  orgsLoaded,
  permissionKey
}: UseAccessibleOrgsOptions<T>) => {
  const [triggerGetKeys] = useLazyGetUserKeysQuery();

  // Track which orgs have been checked and their results.
  // Map<orgId, hasPermission>
  const [checkedOrgs, setCheckedOrgs] = useState<Map<string, boolean>>(new Map());
  const [isChecking, setIsChecking] = useState(false);

  // Stable ref to avoid re-triggering the effect on every state update
  const checkedRef = useRef<Set<string>>(new Set());

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
      for (const r of results) {
        if (r.status === 'fulfilled') {
          next.set(r.value.orgId, r.value.hasPermission);
        }
        // On failure, treat the org as inaccessible (don't show it)
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
