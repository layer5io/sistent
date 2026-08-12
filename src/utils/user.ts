import type { components as UserComponents } from '@meshery/schemas/constructs/v1beta3/user/User';
import { DeletedAt } from './nullTime';

/**
 * The canonical collaboration projection of the v1beta3 `user` construct: what
 * the authenticated people-picker endpoints serve. Exported so consumers can
 * name the unmodified contract.
 */
export type CanonicalSearchableUser = UserComponents['schemas']['SearchableUser'];

/**
 * Collaboration-facing user record, derived from the canonical
 * {@link CanonicalSearchableUser} projection rather than re-declared, so that a
 * rename in `@meshery/schemas` is a compile error here instead of an
 * `undefined` in every Meshery UI downstream of sistent.
 *
 * The canonical identifier is `id`; `userId` survives only as a deprecated wire
 * alias emitted by providers that predate the `users.user_id` column
 * retirement - read both through {@link getUserIdentifier}.
 *
 * Three deliberate divergences from the canonical projection:
 *
 *  - `id` is optional. The canonical requires it, but sistent also renders
 *    records assembled by hosts from older provider payloads that carry only
 *    the `userId` alias; the fallback helpers below exist for exactly that.
 *  - `deletedAt` is {@link DeletedAt} rather than `string | null`, because some
 *    provider endpoints still emit the legacy Go `sql.NullTime`
 *    `{ Valid, Time }` object. See `src/utils/nullTime.ts`.
 *  - `roleNames` is added. It is not part of the `SearchableUser` projection
 *    (which deliberately excludes roles) but is present on the org-scoped user
 *    listings the users table renders, where it carries the same meaning as
 *    `User.roleNames` in the canonical construct.
 */
export type User = Omit<CanonicalSearchableUser, 'id' | 'deletedAt'> & {
  id?: CanonicalSearchableUser['id'];
  deletedAt?: DeletedAt;
  roleNames?: string[];
};

/**
 * Resolves the canonical identifier of a user record: v1beta3 `id` first,
 * falling back to the deprecated `userId` alias for records produced by
 * pre-cutover providers. Returns an empty string when neither is present.
 */
export const getUserIdentifier = (user: User | null | undefined): string =>
  user?.id || user?.userId || '';

/**
 * Human-readable name with wire-shape fallbacks: "First Last" when the
 * projection carries names, else username, else email, else empty string.
 */
export const getUserDisplayName = (user: User | null | undefined): string => {
  if (!user) return '';
  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ').trim();
  return fullName || user.username || user.email || '';
};

/**
 * Contact line shown under or instead of the display name: email when the
 * projection carries it, else username. Empty string when neither is present.
 */
export const getUserContactLabel = (user: User | null | undefined): string =>
  user?.email || user?.username || '';

/**
 * Guaranteed-non-empty label for chips, option labels, and notification
 * text: contact label first (email, then username), then display name, then
 * the raw identifier. Only a record with no identifier at all yields an
 * empty string, and such records are rejected by the share/revoke guards.
 */
export const getUserLabel = (user: User | null | undefined): string =>
  getUserContactLabel(user) || getUserDisplayName(user) || getUserIdentifier(user);

/**
 * Identity comparison across wire shapes: the same object reference is
 * trivially the same user, then canonical/legacy identifiers when both
 * records carry one, else email. Two distinct records with no comparable
 * field are never considered the same user.
 */
export const isSameUser = (a: User | null | undefined, b: User | null | undefined): boolean => {
  if (a && b && a === b) return true;
  const idA = getUserIdentifier(a);
  const idB = getUserIdentifier(b);
  if (idA && idB) return idA === idB;
  if (a?.email && b?.email) return a.email === b.email;
  return false;
};
