/**
 * Re-exports the canonical RJSF form schema for the publish-catalog-item
 * modal from @meshery/schemas. The schema is the authoritative source for
 * this form and is validated against the v1beta2 catalog OpenAPI construct.
 *
 * @see meshery/schemas#866 — migration from hand-authored to canonical
 * @see meshery/schemas schemas/constructs/v1beta2/catalog/forms/publish.json
 */
export { CatalogPublishRjsfSchemaV1Beta2 as default } from '@meshery/schemas';
