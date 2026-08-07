import {
  ResourceAccessActorError,
  buildGrantAccessPayload,
  buildRevokeAccessPayload,
  toResourceAccessActors
} from '../custom/ShareModal/resourceAccessPayload';

// Wire-contract guard for the resource share / revoke payload that
// `ShareModal` posts to `POST /api/resources/{type}/{id}/share` (via the
// host-supplied `resourceAccessMutator`).
//
// The server model is meshery-cloud's `models.ResourceAccessMappingPayload`,
// which decodes with a strict `json.Unmarshal` into a struct whose fields all
// carry `omitempty`. Every key it does not recognise is dropped silently and
// the handler still answers 200 - so a stale key name here is not a visible
// error, it is a share that reports success and grants nothing.
//
// meshery-cloud flipped this contract to canonical camelCase in
// `fix(wire-format): flip Credential/Organization/Team/MesheryFilter/sibling
// JSON tags to canonical camelCase (Phase 4 tail)`, which also renamed the
// actor fields:
//
//   { grantAccess: [{ actorId, actorType }], revokeAccess: [...], notifyUsers }
//
// These assertions are deliberately written against literal key names rather
// than a type: the failure mode is a runtime key mismatch that no TypeScript
// type on either side of the boundary can observe (the mutator is `any`).

const jane = {
  id: 'b6e6d123-0000-4000-8000-000000000001',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com'
};

// A record from a provider that predates the retirement of the `users.user_id`
// column: the canonical `id` is absent and the deprecated alias carries it.
const legacyAliasUser = {
  userId: 'b6e6d123-0000-4000-8000-000000000002',
  email: 'legacy@example.com'
};

// A record neither identifier resolves on. `models.Actor.ActorId` is
// `core.Uuid` (gofrs `uuid.UUID`), whose `UnmarshalText` rejects a zero-length
// string, so emitting `actorId: ''` fails the handler's `json.Unmarshal` and
// takes the whole request down with a 400 - the valid actors alongside it
// included. The builders are public API, so the rejection has to live in them
// and not only in `ShareModal`'s handlers.
const unidentifiableUser = {
  email: 'ghost@example.com'
};

describe('resource access mapping payload', () => {
  describe('toResourceAccessActors', () => {
    it('emits the canonical camelCase actor keys', () => {
      expect(toResourceAccessActors([jane])).toEqual([{ actorId: jane.id, actorType: 'user' }]);
    });

    it('never emits the retired snake_case actor keys', () => {
      const [actor] = toResourceAccessActors([jane]);
      expect(Object.keys(actor).sort()).toEqual(['actorId', 'actorType']);
    });

    it('resolves the actor id through the canonical/legacy identifier fallback', () => {
      expect(toResourceAccessActors([legacyAliasUser])).toEqual([
        { actorId: legacyAliasUser.userId, actorType: 'user' }
      ]);
    });

    it('rejects a record whose identifier cannot be resolved', () => {
      expect(() => toResourceAccessActors([unidentifiableUser])).toThrow(ResourceAccessActorError);
    });

    it('rejects the whole batch when any one record is unidentifiable', () => {
      expect(() => toResourceAccessActors([jane, unidentifiableUser])).toThrow(
        ResourceAccessActorError
      );
    });

    it('names the offending records on the error', () => {
      let thrown: ResourceAccessActorError | undefined;
      try {
        toResourceAccessActors([jane, unidentifiableUser]);
      } catch (error) {
        thrown = error as ResourceAccessActorError;
      }

      expect(thrown?.actors).toEqual([unidentifiableUser]);
      expect(thrown?.message).toContain(unidentifiableUser.email);
    });

    it('accepts an empty list', () => {
      expect(toResourceAccessActors([])).toEqual([]);
    });
  });

  describe('buildGrantAccessPayload', () => {
    it('emits exactly the three canonical payload keys', () => {
      expect(Object.keys(buildGrantAccessPayload([jane])).sort()).toEqual([
        'grantAccess',
        'notifyUsers',
        'revokeAccess'
      ]);
    });

    it('puts the actors on grantAccess and leaves revokeAccess empty', () => {
      expect(buildGrantAccessPayload([jane])).toEqual({
        grantAccess: [{ actorId: jane.id, actorType: 'user' }],
        revokeAccess: [],
        notifyUsers: true
      });
    });

    it('never emits an empty actorId', () => {
      expect(() => buildGrantAccessPayload([unidentifiableUser])).toThrow(ResourceAccessActorError);
    });
  });

  describe('buildRevokeAccessPayload', () => {
    it('puts the actors on revokeAccess and leaves grantAccess empty', () => {
      expect(buildRevokeAccessPayload([jane])).toEqual({
        grantAccess: [],
        revokeAccess: [{ actorId: jane.id, actorType: 'user' }],
        notifyUsers: true
      });
    });

    it('never emits an empty actorId', () => {
      expect(() => buildRevokeAccessPayload([unidentifiableUser])).toThrow(
        ResourceAccessActorError
      );
    });
  });
});
