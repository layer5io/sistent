/**
 * Re-exports the canonical RJSF form schema for the import-filter modal
 * from @meshery/schemas. The schema is the authoritative source for this
 * form and is validated against the v1beta3 filter MesheryFilterPayload
 * OpenAPI construct.
 *
 * @see meshery/schemas#866 — migration from hand-authored to canonical
 * @see meshery/schemas schemas/constructs/v1beta3/filter/forms/import.json
 */
export { FilterImportRjsfSchemaV1Beta3 as default } from '@meshery/schemas';
