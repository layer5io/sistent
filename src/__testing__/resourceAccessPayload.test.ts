import {
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

describe('resource access mapping payload', () => {
  describe('toResourceAccessActors', () => {
    it('emits the canonical camelCase actor keys', () => {
      expect(toResourceAccessActors([jane])).toEqual([
        { actorId: jane.id, actorType: 'user' }
      ]);
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
  });

  describe('buildRevokeAccessPayload', () => {
    it('puts the actors on revokeAccess and leaves grantAccess empty', () => {
      expect(buildRevokeAccessPayload([jane])).toEqual({
        grantAccess: [],
        revokeAccess: [{ actorId: jane.id, actorType: 'user' }],
        notifyUsers: true
      });
    });
  });
});
