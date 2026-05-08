/**
 * Re-exports the canonical RJSF form schema for creating a Prometheus
 * credential from @meshery/schemas. The schema is the authoritative source
 * for this form and is validated against the v1beta1 credential OpenAPI
 * construct.
 *
 * @see meshery/schemas#866 — migration from hand-authored to canonical
 * @see meshery/schemas schemas/constructs/v1beta1/credential/forms/prometheus.json
 */
export { PrometheusCredentialRjsfSchemaV1Beta1 as default } from '@meshery/schemas';
