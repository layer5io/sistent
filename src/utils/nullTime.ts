/**
 * Utilities for the soft-delete timestamp (`deletedAt`) that Meshery/Layer5
 * APIs attach to soft-deletable entities (teams, users, workspaces, ...).
 *
 * The value arrives in more than one shape depending on which endpoint and
 * serializer produced it:
 *
 *  - `null` / `undefined` — the entity is NOT soft-deleted. This is the
 *    canonical `meshery/schemas` wire shape: `core.NullTime` marshals a live
 *    row to JSON `null`.
 *  - an ISO-8601 timestamp `string` — the entity IS soft-deleted; the string
 *    is the deletion time. This is the canonical schema shape for a deleted
 *    row (`type: string, format: date-time`).
 *  - a `{ Valid: boolean; Time?: ... }` object — the legacy Go `sql.NullTime`
 *    JSON shape still emitted by some provider endpoints. Deleted iff `Valid`.
 *
 * Reading `.Valid` directly is unsafe: when `deletedAt` is `null` the access
 * throws `null is not an object (evaluating '…deletedAt.Valid')` — the crash
 * that took down the Invite User widget's team search. Route every soft-delete
 * check through these helpers so no shape can crash the UI.
 */

/** The legacy Go `sql.NullTime` JSON shape. */
export interface SqlNullTime {
  Valid: boolean;
  Time?: string | number | Date | null;
}

/** Every shape a `deletedAt` value may take on the wire. */
export type DeletedAt = string | SqlNullTime | null | undefined;

/**
 * Returns `true` when a `deletedAt` value indicates the entity has been
 * soft-deleted, tolerating every shape the value may take (null/undefined,
 * timestamp string, or legacy `{ Valid, Time }` object).
 */
export const isSoftDeleted = (deletedAt: DeletedAt): boolean => {
  if (deletedAt === null || deletedAt === undefined) return false;
  if (typeof deletedAt === 'string') return deletedAt.trim().length > 0;
  if (typeof deletedAt === 'object') return deletedAt.Valid === true;
  return false;
};

/**
 * Returns the deletion timestamp suitable for a date formatter when the entity
 * is soft-deleted, otherwise `undefined`. Handles both the timestamp-string and
 * legacy `{ Valid, Time }` object shapes.
 */
export const getDeletedAtTime = (deletedAt: DeletedAt): string | number | Date | undefined => {
  if (!isSoftDeleted(deletedAt)) return undefined;
  if (typeof deletedAt === 'string') return deletedAt;
  if (deletedAt && typeof deletedAt === 'object') {
    return deletedAt.Time ?? undefined;
  }
  return undefined;
};
