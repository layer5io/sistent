import { getDeletedAtTime, isSoftDeleted } from '../utils/nullTime';

describe('isSoftDeleted', () => {
  it('treats null / undefined as NOT soft-deleted (canonical live-row shape)', () => {
    expect(isSoftDeleted(null)).toBe(false);
    expect(isSoftDeleted(undefined)).toBe(false);
  });

  it('does not throw on null (regression: Invite User widget crash)', () => {
    // The original crash was `null is not an object (evaluating 't?.deletedAt.Valid')`.
    expect(() => isSoftDeleted(null)).not.toThrow();
  });

  it('treats a non-empty timestamp string as soft-deleted (canonical deleted-row shape)', () => {
    expect(isSoftDeleted('2026-07-14T20:33:05Z')).toBe(true);
  });

  it('treats an empty / whitespace string as NOT soft-deleted', () => {
    expect(isSoftDeleted('')).toBe(false);
    expect(isSoftDeleted('   ')).toBe(false);
  });

  it('honors the legacy Go sql.NullTime object shape', () => {
    expect(isSoftDeleted({ Valid: true, Time: '2026-07-14T20:33:05Z' })).toBe(true);
    expect(isSoftDeleted({ Valid: false, Time: '0001-01-01T00:00:00Z' })).toBe(false);
    expect(isSoftDeleted({ Valid: false })).toBe(false);
  });
});

describe('getDeletedAtTime', () => {
  it('returns undefined when not soft-deleted', () => {
    expect(getDeletedAtTime(null)).toBeUndefined();
    expect(getDeletedAtTime(undefined)).toBeUndefined();
    expect(getDeletedAtTime({ Valid: false, Time: '0001-01-01T00:00:00Z' })).toBeUndefined();
  });

  it('returns the string itself for the canonical deleted-row shape', () => {
    expect(getDeletedAtTime('2026-07-14T20:33:05Z')).toBe('2026-07-14T20:33:05Z');
  });

  it('returns the .Time member for the legacy object shape', () => {
    expect(getDeletedAtTime({ Valid: true, Time: '2026-07-14T20:33:05Z' })).toBe(
      '2026-07-14T20:33:05Z'
    );
  });
});
