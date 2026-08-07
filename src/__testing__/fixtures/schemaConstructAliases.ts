// Type-level fixture for sistent's aliases of `@meshery/schemas` constructs.
// It is compiled by `schemaConstructAliasTypes.test.ts` via `tsc --noEmit`,
// never executed, and is deliberately outside jest's `*.test.*` glob so jest
// does not collect it.
//
// Sistent is upstream of every Meshery UI, so a schemas-owned shape copied here
// propagates to all of them. The local types are therefore derived from the
// canonical constructs with `Pick` / `Omit` rather than re-declared - but that
// derivation has a hole this fixture exists to close:
//
//   `Omit<T, 'gone'>` where `T` has no `gone` is not an error. It is a no-op.
//
// So when a construct renames a field that sistent overrides, the `Omit` stops
// removing anything, the intersected override silently becomes an *addition* of
// a field the wire no longer carries, and nothing anywhere fails. That is the
// same silent-rename failure the derivation was adopted to prevent.
//
// `RequiresKey` closes it: every key sistent omits or narrows is asserted to
// still exist on the canonical type it was taken from.
import type { components as DesignComponents } from '@meshery/schemas/constructs/v1beta3/design/Design';
import type { components as EnvironmentComponents } from '@meshery/schemas/constructs/v1beta3/environment/Environment';
import type { components as EventComponents } from '@meshery/schemas/constructs/v1beta3/event/Event';
import type { components as TeamComponents } from '@meshery/schemas/constructs/v1beta2/team/Team';
import type { components as UserComponents } from '@meshery/schemas/constructs/v1beta3/user/User';
import type { components as WorkspaceComponents } from '@meshery/schemas/constructs/v1beta3/workspace/Workspace';
import type { UserProfile } from '../../custom/CatalogDetail/types';
import type { Pattern } from '../../custom/CustomCatalog/CustomCard';
import type { Environment, Team, Workspace } from '../../custom/Workspaces/types';
import type { User } from '../../utils/user';

/**
 * Resolves to `K` only while every key in `K` exists on `T`. Used as
 * `type _ = RequiresKey<Canonical, 'someKey'>`, which stops compiling the
 * moment `someKey` leaves the canonical construct.
 */
type RequiresKey<T, K extends keyof T> = K;

/**
 * `true` only while `T` and `U` are the same type, in both directions.
 *
 * Paired with {@link Expect}, which is what turns a mismatch into a compiler
 * error: a bare conditional type that resolves to `never` or `false` is a
 * perfectly legal type alias and reports nothing.
 */
type IsExact<T, U> = [T] extends [U] ? ([U] extends [T] ? true : false) : false;

/** Compiles only when handed `true`; anything else is a TS2344 constraint error. */
type Expect<T extends true> = T;

type CanonicalWorkspace = WorkspaceComponents['schemas']['Workspace'];
type CanonicalEnvironment = EnvironmentComponents['schemas']['Environment'];
type CanonicalTeam = TeamComponents['schemas']['Team'];
type CanonicalSearchableUser = UserComponents['schemas']['SearchableUser'];
type CanonicalPattern = DesignComponents['schemas']['MesheryPattern'];
type CanonicalEventResult = EventComponents['schemas']['EventResult'];
type CanonicalEventsPage = EventComponents['schemas']['EventsPage'];

// --- Keys sistent omits or narrows, asserted to still exist upstream --------

export type WorkspaceOverrides = RequiresKey<
  CanonicalWorkspace,
  'organizationId' | 'deletedAt' | 'id' | 'name' | 'description' | 'createdAt' | 'updatedAt'
>;

export type EnvironmentOverrides = RequiresKey<
  CanonicalEnvironment,
  'createdAt' | 'updatedAt' | 'id' | 'name'
>;

export type TeamOverrides = RequiresKey<CanonicalTeam, 'deletedAt' | 'id' | 'name'>;

export type UserOverrides = RequiresKey<
  CanonicalSearchableUser,
  'id' | 'deletedAt' | 'userId' | 'username' | 'firstName' | 'lastName' | 'email' | 'avatarUrl'
>;

export type PatternOverrides = RequiresKey<
  CanonicalPattern,
  | 'id'
  | 'userId'
  | 'patternFile'
  | 'name'
  | 'visibility'
  | 'catalogData'
  | 'user'
  | 'createdAt'
  | 'updatedAt'
>;

export type EventResultOverrides = RequiresKey<
  CanonicalEventResult,
  'createdAt' | 'description' | 'firstName' | 'lastName'
>;

export type EventsPageOverrides = RequiresKey<CanonicalEventsPage, 'page' | 'totalCount'>;

export type UserProfileOverrides = RequiresKey<
  CanonicalSearchableUser,
  'firstName' | 'lastName' | 'avatarUrl'
>;

// --- Fields carried through unchanged, asserted to be the canonical types ---
//
// A widened override that later drifts (say `createdAt` typed `Date` again, the
// defect this audit found on `Pattern`) shows up here as a type mismatch.

export type WorkspaceTimestampsAreCanonical = Expect<
  IsExact<Workspace['createdAt'], CanonicalWorkspace['createdAt']>
>;

export type PatternCreatedAtIsCanonical = Expect<
  IsExact<Pattern['createdAt'], CanonicalPattern['createdAt']>
>;

export type PatternUpdatedAtIsCanonical = Expect<
  IsExact<Pattern['updatedAt'], CanonicalPattern['updatedAt']>
>;

export type PatternCountsAreCanonical = Expect<
  IsExact<Pattern['downloadCount'], CanonicalPattern['downloadCount']>
>;

export type EnvironmentOrgIdIsCanonical = Expect<
  IsExact<Environment['organizationId'], CanonicalEnvironment['organizationId']>
>;

export type TeamNameIsCanonical = Expect<IsExact<Team['name'], CanonicalTeam['name']>>;

export type UserEmailIsCanonical = Expect<
  IsExact<User['email'], CanonicalSearchableUser['email']>
>;

export type UserProfileAvatarIsCanonical = Expect<
  IsExact<UserProfile['avatarUrl'], NonNullable<CanonicalSearchableUser['avatarUrl']>>
>;

// Self-check for the pair above: `Expect` is the half that reports, and a
// mismatch it fails to catch is invisible. If `IsExact` ever stops discriminating
// - or `Expect` stops constraining - this suppression goes unused and tsc
// reports TS2578.
// @ts-expect-error - a workspace id is a string, not a number
export type ExpectRejectsAMismatch = Expect<IsExact<CanonicalWorkspace['id'], number>>;

// --- Fields the canonical does NOT model, asserted to stay absent ------------
//
// `teamId` / `team_name` were read off a team record by the bulk-delete button
// and never existed on the wire. If a future schemas release does introduce
// them, this suppression goes unused and tsc reports TS2578, which is the
// signal to consume the canonical field instead of the `id` / `name` fallback.
// @ts-expect-error - the canonical team construct has no `teamId`
export type TeamHasNoTeamId = RequiresKey<CanonicalTeam, 'teamId'>;

// --- Subpath resolution, formerly propped up by a local ambient shim --------
//
// `src/types/meshery-schemas.d.ts` used to `declare module` these three
// subpaths, asserting each resolved to the *v1beta1* schema object - so the
// canonical `.d.ts` shipped in the package was shadowed by a hand-written
// mapping to a different version's type. `@meshery/schemas` exports
// `./constructs/*` with types, and this repo resolves with
// `moduleResolution: "bundler"`, so the shim was both redundant and wrong; it
// was deleted. These imports keep the resolution it was covering asserted.
export type ModelSchemaResolves = typeof import(
  '@meshery/schemas/constructs/v1beta2/model/ModelSchema'
).default;
export type EnvironmentSchemaResolves = typeof import(
  '@meshery/schemas/constructs/v1beta3/environment/EnvironmentSchema'
).default;
export type WorkspaceSchemaResolves = typeof import(
  '@meshery/schemas/constructs/v1beta3/workspace/WorkspaceSchema'
).default;

// Self-check: if the compiler ever stops type-checking this fixture, the
// suppression below goes unused and tsc reports TS2578 here, failing the test
// rather than letting it pass vacuously.
// @ts-expect-error - `definitelyNotAField` is not a key of the workspace construct
export type FixtureIsChecked = RequiresKey<CanonicalWorkspace, 'definitelyNotAField'>;
