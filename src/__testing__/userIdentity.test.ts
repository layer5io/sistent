import {
  getUserContactLabel,
  getUserDisplayName,
  getUserIdentifier,
  getUserLabel,
  isSameUser
} from '../utils/user';

// The v1beta3 user construct retired the wire `userId` (canonical identifier
// is `id`) and the hardened cloud endpoints serve reduced projections: the
// searchable collaboration projection carries names+email, the public
// directory only username+avatar. These helpers are the single place where
// display and identity logic absorbs those wire shapes.

const v1beta3SearchableUser = {
  id: 'b6e6d123-0000-4000-8000-000000000001',
  username: 'jdoe',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@example.com',
  avatarUrl: 'https://example.com/a.png'
};

const legacyUser = {
  userId: 'legacy-0000-4000-8000-000000000002',
  firstName: 'Lee',
  lastName: 'Smith',
  email: 'lee@example.com'
};

const publicDirectoryUser = {
  id: 'b6e6d123-0000-4000-8000-000000000003',
  username: 'publico',
  avatarUrl: 'https://example.com/p.png'
};

describe('getUserIdentifier', () => {
  it('prefers the canonical v1beta3 id', () => {
    expect(getUserIdentifier({ id: 'abc', userId: 'legacy' })).toBe('abc');
  });

  it('falls back to the deprecated userId alias for pre-cutover records', () => {
    expect(getUserIdentifier(legacyUser)).toBe('legacy-0000-4000-8000-000000000002');
  });

  it('returns an empty string when no identifier is present', () => {
    expect(getUserIdentifier({})).toBe('');
    expect(getUserIdentifier(null)).toBe('');
    expect(getUserIdentifier(undefined)).toBe('');
  });
});

describe('getUserDisplayName', () => {
  it('joins first and last name when the projection carries them', () => {
    expect(getUserDisplayName(v1beta3SearchableUser)).toBe('Jane Doe');
  });

  it('handles a single name part without stray whitespace', () => {
    expect(getUserDisplayName({ firstName: 'Jane' })).toBe('Jane');
    expect(getUserDisplayName({ lastName: 'Doe' })).toBe('Doe');
  });

  it('falls back to username for reduced projections', () => {
    expect(getUserDisplayName(publicDirectoryUser)).toBe('publico');
  });

  it('falls back to email when neither names nor username are present', () => {
    expect(getUserDisplayName({ email: 'only@example.com' })).toBe('only@example.com');
  });

  it('returns an empty string for empty records', () => {
    expect(getUserDisplayName({})).toBe('');
    expect(getUserDisplayName(null)).toBe('');
  });
});

describe('getUserContactLabel', () => {
  it('prefers email', () => {
    expect(getUserContactLabel(v1beta3SearchableUser)).toBe('jane@example.com');
  });

  it('falls back to username when email is not served', () => {
    expect(getUserContactLabel(publicDirectoryUser)).toBe('publico');
  });

  it('returns an empty string when neither is present', () => {
    expect(getUserContactLabel({})).toBe('');
  });
});

describe('getUserLabel', () => {
  it('prefers the contact label', () => {
    expect(getUserLabel(v1beta3SearchableUser)).toBe('jane@example.com');
  });

  it('falls back to the display name, then the raw identifier', () => {
    expect(getUserLabel({ id: 'u-1', firstName: 'Jane' })).toBe('Jane');
    expect(getUserLabel({ id: 'u-1' })).toBe('u-1');
  });

  it('yields an empty string only for records with no identifier at all', () => {
    expect(getUserLabel({})).toBe('');
  });
});

describe('isSameUser', () => {
  it('matches the same object reference even with no comparable fields', () => {
    const bare = {};
    expect(isSameUser(bare, bare)).toBe(true);
  });

  it('matches canonical id against the deprecated userId alias', () => {
    expect(isSameUser({ id: 'same' }, { userId: 'same' })).toBe(true);
  });

  it('does not match different identifiers even when emails collide', () => {
    expect(
      isSameUser({ id: 'a', email: 'shared@example.com' }, { id: 'b', email: 'shared@example.com' })
    ).toBe(false);
  });

  it('falls back to email when either record has no identifier', () => {
    expect(isSameUser({ email: 'x@example.com' }, { id: 'a', email: 'x@example.com' })).toBe(true);
  });

  it('never matches distinct records with nothing to compare', () => {
    expect(isSameUser({}, {})).toBe(false);
    expect(isSameUser({ email: '' }, { email: '' })).toBe(false);
    expect(isSameUser(null, { id: 'a' })).toBe(false);
  });
});
