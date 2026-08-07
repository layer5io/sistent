import type { components as EnvironmentComponents } from '@meshery/schemas/constructs/v1beta3/environment/Environment';
import type { components as TeamComponents } from '@meshery/schemas/constructs/v1beta2/team/Team';
import type { components as WorkspaceComponents } from '@meshery/schemas/constructs/v1beta3/workspace/Workspace';
import { DeletedAt } from '../../utils/nullTime';

// The canonical constructs. Sistent is upstream of every Meshery UI, so a
// shape copied here propagates to all of them: these types are derived from
// `@meshery/schemas` rather than re-declared, so that a rename in the canonical
// source becomes a compile error here instead of a silent `undefined` in a
// consumer. Where sistent deliberately diverges, the divergence is spelled out
// as an explicit `Omit`/`&` with its reason - never as a quiet re-declaration.
export type CanonicalWorkspace = WorkspaceComponents['schemas']['Workspace'];
export type CanonicalEnvironment = EnvironmentComponents['schemas']['Environment'];
export type CanonicalTeam = TeamComponents['schemas']['Team'];

export interface AssignmentHookResult<T> {
  data: T[];
  workspaceData: T[];
  assignModal: boolean;
  handleAssignModal: (e?: React.MouseEvent) => void;
  handleAssignModalClose: (e?: React.MouseEvent) => void;
  handleAssignablePage: () => void;
  handleAssignedPage: () => void;
  handleAssign: () => void;
  handleAssignData: (data: T[]) => void;
  isActivityOccurred?: (allItems: T[]) => boolean;
  disableTransferButton: boolean;
  assignedItems: T[];
}

/**
 * The v1beta3 workspace construct as sistent consumes it.
 *
 * Two deliberate widenings over the canonical shape, both of them tolerance for
 * wire values the canonical does not describe but that do reach the UI:
 *
 *  - `organizationId` is optional. The canonical requires it, but the workspace
 *    projections a picker renders (`AvailableWorkspace`, and the `{id, name}`
 *    rows of the move-content modal) omit it.
 *  - `deletedAt` is {@link DeletedAt} rather than `string | undefined`, because
 *    some provider endpoints still emit the legacy Go `sql.NullTime`
 *    `{ Valid, Time }` object. See `src/utils/nullTime.ts` for the crash that
 *    reading `.Valid` off a value typed to the canonical shape produced.
 */
export type Workspace = Omit<CanonicalWorkspace, 'organizationId' | 'deletedAt'> & {
  organizationId?: CanonicalWorkspace['organizationId'];
  deletedAt: DeletedAt;
};

/**
 * The v1beta3 environment construct as sistent consumes it. `createdAt` and
 * `updatedAt` are required here because the environment table renders both
 * unconditionally; the canonical marks them optional so that the same schema
 * can describe a create payload.
 */
export type Environment = Omit<CanonicalEnvironment, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

/**
 * The v1beta2 team construct as sistent consumes it, widened only on
 * `deletedAt` for the same legacy `sql.NullTime` reason as {@link Workspace}.
 *
 * This type previously carried two extra fields, `teamId` and `team_name`, read
 * by the bulk-delete button in `TeamTable/TeamTableConfiguration.tsx`. Neither
 * exists on the wire: meshery-cloud aliases its `Team` straight to the
 * canonical `team.Team` (`server/models/model_aliases_org.go`), whose identity
 * fields are `id` and `name`, and the Phase 4 wire-format flip removed the
 * snake_case aliases outright. Both reads yielded `undefined`.
 *
 * The canonical is taken from v1beta2 rather than through the v1beta3 workspace
 * API's `getTeamsOfWorkspace` operation, which still `$ref`s the snake_case
 * v1beta1 `TeamPage` - see https://github.com/meshery/schemas/issues/1143.
 */
export type Team = Omit<CanonicalTeam, 'deletedAt'> & {
  deletedAt: DeletedAt;
};
