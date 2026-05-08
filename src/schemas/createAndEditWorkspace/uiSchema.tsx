/**
 * UI schema for the create-or-edit workspace modals.
 *
 * Source-of-truth: re-exported from `@meshery/schemas` per the
 * form-schema canonicalization tracked in
 * https://github.com/meshery/schemas/issues/866 (Phase 3).
 *
 * The published Sistent export name (`createAndEditWorkspaceUiSchema`)
 * is unchanged. The canonical UI schema already keys
 * `ui:disabled` / `ui:widget` and `ui:order` on the canonical
 * field name `organizationId`.
 */
export { WorkspaceCreateOrEditRjsfUiSchemaV1Beta3 as default } from '@meshery/schemas';
