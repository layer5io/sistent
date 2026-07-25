import { DeletedAt } from './nullTime';

/**
 * Collaboration-facing user record, aligned with the v1beta3 `user` construct
 * of @meshery/schemas. The canonical identifier is `id`; `userId` survives
 * only as a deprecated wire alias emitted by providers that predate the
 * users.user_id column retirement. Reduced projections (the public users
 * directory, the searchable collaboration projection) omit some or all of the
 * name/email fields, so everything except the identifiers is optional and
 * display code must go through the fallback helpers below.
 */
export interface User {
  /** Canonical unique identifier of the user (v1beta3 `id`). */
  id?: string;
  /** @deprecated Legacy duplicate of `id`; read via {@link getUserIdentifier}. */
  userId?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatarUrl?: string;
  deletedAt?: DeletedAt;
  roleNames?: string[];
}

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
