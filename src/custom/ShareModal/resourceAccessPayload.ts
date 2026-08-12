import { User, getUserIdentifier, getUserLabel } from '../../utils/user';

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
 * Thrown by {@link toResourceAccessActors} for records whose identifier cannot
 * be resolved. {@link ResourceAccessActorError.actors} carries the offending
 * records so a caller can name them back to the user.
 */
export class ResourceAccessActorError extends Error {
  readonly actors: User[];

  constructor(actors: User[]) {
    const labels = actors.map((actor) => getUserLabel(actor) || '<unidentifiable record>');
    super(`Cannot build a resource access payload: ${labels.join(', ')} has no identifier`);
    this.name = 'ResourceAccessActorError';
    this.actors = actors;
  }
}

/**
 * Maps user records onto share actors, resolving each identifier through the
 * canonical-then-legacy fallback in {@link getUserIdentifier}.
 *
 * Records that resolve to no identifier are rejected here rather than emitted
 * as `actorId: ''`. The server's `models.Actor.ActorId` is `core.Uuid`, i.e.
 * gofrs `uuid.UUID`, whose `UnmarshalText` rejects a zero-length string, so an
 * empty `actorId` fails `HandleResourceShare`'s `json.Unmarshal` and takes the
 * whole request down with a 400 - every other actor in the batch included.
 *
 * @throws {ResourceAccessActorError} when any record has no identifier.
 */
export const toResourceAccessActors = (users: User[]): ResourceAccessActor[] => {
  const unidentifiable = users.filter((user) => !getUserIdentifier(user));
  if (unidentifiable.length > 0) throw new ResourceAccessActorError(unidentifiable);

  return users.map((user) => ({ actorId: getUserIdentifier(user), actorType: 'user' }));
};

/**
 * Payload that grants `users` access and notifies them.
 *
 * @throws {ResourceAccessActorError} when any record has no identifier.
 */
export const buildGrantAccessPayload = (users: User[]): ResourceAccessMappingPayload => ({
  grantAccess: toResourceAccessActors(users),
  revokeAccess: [],
  notifyUsers: true
});

/**
 * Payload that revokes `users`' access and notifies them.
 *
 * @throws {ResourceAccessActorError} when any record has no identifier.
 */
export const buildRevokeAccessPayload = (users: User[]): ResourceAccessMappingPayload => ({
  grantAccess: [],
  revokeAccess: toResourceAccessActors(users),
  notifyUsers: true
});
