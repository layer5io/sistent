/**
 * Schemas for the create-or-edit workspace modals.
 *
 * Source-of-truth: re-exported from `@meshery/schemas` per the form-schema
 * canonicalization tracked in
 * https://github.com/meshery/schemas/issues/866 (Phase 3).
 *
 * The previously hand-authored object literal has moved to
 * `meshery/schemas` at
 * `schemas/constructs/v1beta3/workspace/forms/createOrEdit.json`,
 * where a Go subset-validator (`validation/forms_test.go`) keeps it
 * structurally aligned with the canonical OpenAPI Workspace construct.
 *
 * Wire-level change: the field formerly keyed as `organization` is
 * now keyed as `organizationId`, matching canonical
 * `WorkspacePayload.organizationId`.
 *
 * Two exports are published:
 *
 *   - default (`createAndEditWorkspaceSchema`): the create-or-edit
 *     form with `name` and `organizationId` required.
 *   - named (`editWorkspaceSchema`): a relaxed variant where only
 *     `organizationId` is required — used by the edit-only modal
 *     where the existing workspace name is preserved if blank.
 *
 * The relaxed-`required` variant is derived locally from the
 * canonical schema by spreading the canonical and overriding
 * `required`. Once `@meshery/schemas` ships an
 * `WorkspaceEditRjsfSchemaV1Beta3` (a relaxed-required canonical
 * variant), this derivation can be deleted in favor of a direct
 * re-export.
 */
import { WorkspaceCreateOrEditRjsfSchemaV1Beta3 } from '@meshery/schemas';

// `editWorkspace` is intentionally typed as a loose record so its
// emitted `.d.ts` doesn't reference @meshery/schemas's internal
// `RJSFSchema` type (declared but not currently re-exported by that
// package — see the follow-up issue against meshery/schemas to add
// `export type { RJSFSchema, UiSchema }` to the public surface).
// Once that type is exportable, this annotation can be tightened.
const editWorkspace: Record<string, unknown> = {
  ...WorkspaceCreateOrEditRjsfSchemaV1Beta3,
  required: ['organizationId']
};

export default WorkspaceCreateOrEditRjsfSchemaV1Beta3;
export { editWorkspace };
