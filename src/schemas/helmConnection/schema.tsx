/**
 * Re-exports the canonical RJSF form schema for creating a Helm repository
 * connection from @meshery/schemas. The schema is the authoritative source
 * for this form and is validated against the v1beta3 connection OpenAPI
 * construct.
 *
 * NOTE: The canonical form uses `name`, `description`, and `url` as top-level
 * fields — the same names the prior hand-authored schema used. The canonical
 * connection.yaml was extended (meshery/schemas#875) to include `description`
 * and `url` as first-class fields on the Connection construct.
 *
 * @see meshery/schemas#866 — migration from hand-authored to canonical
 * @see meshery/schemas schemas/constructs/v1beta3/connection/forms/helmCreate.json
 */
export { ConnectionHelmCreateRjsfSchemaV1Beta3 as default } from '@meshery/schemas';
