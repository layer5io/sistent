import { User, getUserIdentifier } from '../../utils/user';

/**
 * The wire contract for `POST /api/resources/{resourceType}/{resourceId}/share`.
 *
 * This shape is owned by the server (meshery-cloud `HandleResourceShare` and
 * its `models.ResourceAccessMappingPayload` / `models.Actor`) and is *not*
 * modelled in `@meshery/schemas` today, so it cannot be aliased from there -
 * see https://github.com/meshery/schemas/issues/1144. It is defined here, once,
 * rather than inline at each call site precisely because the failure mode is
 * invisible: the handler decodes with a strict `json.Unmarshal` into a struct
 * whose fields all carry `omitempty`, drops every key it does not recognise,
 * and still answers 200. A stale key name therefore produces a share that
 * reports success and grants nothing.
 *
 * `src/__testing__/resourceAccessPayload.test.ts` pins the literal key names.
 * Update both together, and only against the server model.
 */
export type ResourceAccessActor = {
  /** Canonical identifier of the actor; a user id for `actorType: 'user'`. */
  actorId: string;
  actorType: 'user';
};

export interface ResourceAccessMappingPayload {
  grantAccess: ResourceAccessActor[];
  revokeAccess: ResourceAccessActor[];
  notifyUsers: boolean;
}

/**
 * Maps user records onto share actors, resolving each identifier through the
 * canonical-then-legacy fallback in {@link getUserIdentifier}. Callers must
 * reject records without an identifier before building a payload: an empty
 * `actorId` is accepted by the server as a no-op entry.
 */
export const toResourceAccessActors = (users: User[]): ResourceAccessActor[] =>
  users.map((user) => ({ actorId: getUserIdentifier(user), actorType: 'user' }));

/** Payload that grants `users` access and notifies them. */
export const buildGrantAccessPayload = (users: User[]): ResourceAccessMappingPayload => ({
  grantAccess: toResourceAccessActors(users),
  revokeAccess: [],
  notifyUsers: true
});

/** Payload that revokes `users`' access and notifies them. */
export const buildRevokeAccessPayload = (users: User[]): ResourceAccessMappingPayload => ({
  grantAccess: [],
  revokeAccess: toResourceAccessActors(users),
  notifyUsers: true
});
