/**
 * Schema for the create-or-edit environment modal.
 *
 * Source-of-truth: re-exported from `@meshery/schemas` per the form-schema
 * canonicalization tracked in
 * https://github.com/meshery/schemas/issues/866 (Phase 3).
 *
 * The previously hand-authored object literal has moved to
 * `meshery/schemas` at
 * `schemas/constructs/v1beta3/environment/forms/createOrEdit.json`,
 * where a Go subset-validator (`validation/forms_test.go`) keeps it
 * structurally aligned with the canonical OpenAPI Environment construct.
 *
 * Wire-level change: the field formerly keyed as `organization` is
 * now keyed as `organizationId`, matching canonical
 * `EnvironmentPayload.organizationId`. The Meshery server's
 * Environment endpoint already accepts the canonical key per its
 * OpenAPI; this brings the form payload into alignment.
 *
 * The published Sistent export name (`createAndEditEnvironmentSchema`)
 * is unchanged — only the source of the schema has flipped. Consumers
 * in `meshery` and `meshery-cloud` keep working without source-level
 * changes; submission payloads now use `organizationId` for that
 * field.
 */
export { EnvironmentCreateOrEditRjsfSchemaV1Beta3 as default } from '@meshery/schemas';
