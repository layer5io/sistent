import { canShareResourceWithNewUsers, canUpdateResource } from '../utils/permissions';

// The permission checks accept nullish users by contract: consumers call them
// during auth-state transitions (initial load, logout) when currentUser or the
// owner record is not yet available. No user means no permission.

const privateResource = { visibility: 'private' };
const publicResource = { visibility: 'public' };

describe('canUpdateResource', () => {
  it('grants the resource owner, matching canonical id against the deprecated alias', () => {
    expect(canUpdateResource(privateResource, { id: 'u-1' }, { userId: 'u-1' })).toBe(true);
  });

  it('grants admins even when they do not own the resource', () => {
    expect(
      canUpdateResource(privateResource, { id: 'u-2', roleNames: ['admin'] }, { id: 'u-1' })
    ).toBe(true);
  });

  it('denies non-owner non-admin users', () => {
    expect(canUpdateResource(privateResource, { id: 'u-2' }, { id: 'u-1' })).toBe(false);
  });

  it('denies when currentUser is nullish (auth-state transitions)', () => {
    expect(canUpdateResource(privateResource, null, { id: 'u-1' })).toBe(false);
    expect(canUpdateResource(privateResource, undefined, { id: 'u-1' })).toBe(false);
  });

  it('never treats an identifier-less owner as matching an identifier-less user', () => {
    expect(canUpdateResource(privateResource, {}, null)).toBe(false);
    expect(canUpdateResource(privateResource, {}, {})).toBe(false);
  });

  it('denies when the resource is nullish, even for admins', () => {
    expect(canUpdateResource(null, { id: 'u-1', roleNames: ['admin'] }, { id: 'u-1' })).toBe(false);
    expect(canUpdateResource(undefined, { id: 'u-1' }, { id: 'u-1' })).toBe(false);
  });
});

describe('canShareResourceWithNewUsers', () => {
  it('always allows sharing public resources', () => {
    expect(canShareResourceWithNewUsers(publicResource, null, null)).toBe(true);
  });

  it('falls back to the update permission for private resources', () => {
    expect(canShareResourceWithNewUsers(privateResource, { id: 'u-1' }, { id: 'u-1' })).toBe(true);
    expect(canShareResourceWithNewUsers(privateResource, null, { id: 'u-1' })).toBe(false);
  });

  it('denies when the resource is nullish', () => {
    expect(canShareResourceWithNewUsers(null, { id: 'u-1' }, { id: 'u-1' })).toBe(false);
    expect(canShareResourceWithNewUsers(undefined, { id: 'u-1' }, { id: 'u-1' })).toBe(false);
  });
});
