/**
 * Re-exports the canonical RJSF form schema for the create-or-edit
 * environment modal from @meshery/schemas. The schema is the authoritative
 * source for this form and is validated against the v1beta3 environment
 * OpenAPI construct.
 *
 * @see meshery/schemas#866 — migration from hand-authored to canonical
 * @see meshery/schemas schemas/constructs/v1beta3/environment/forms/createOrEdit.json
 */
export { EnvironmentCreateOrEditRjsfSchemaV1Beta3 as default } from '@meshery/schemas';
