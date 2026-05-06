/**
 * Schema for publish catalog item modal;
 * Can be used for publishing filters and designs.
 *
 * Source-of-truth: re-exported from `@meshery/schemas` per the form-schema
 * canonicalization tracked in
 * https://github.com/meshery/schemas/issues/866 (Phase 1).
 *
 * The previously hand-authored object literal has moved to
 * `meshery/schemas` at `typescript/forms/v1beta2/catalog/publish.json`,
 * where a Go subset-validator (`validation/forms_test.go`) keeps it
 * structurally aligned with the canonical OpenAPI Catalog construct.
 *
 * The published Sistent export name (`publishCatalogItemSchema`) is
 * unchanged — only the source of the schema has flipped. Consumers in
 * `meshery` and `meshery-cloud` keep working without source changes.
 */
export { CatalogPublishRjsfSchemaV1Beta2 as default } from '@meshery/schemas';
