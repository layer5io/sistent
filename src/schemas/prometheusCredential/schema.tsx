/**
 * Schema for the Prometheus credential modal.
 *
 * Source-of-truth: re-exported from `@meshery/schemas` per the form-schema
 * canonicalization tracked in
 * https://github.com/meshery/schemas/issues/866 (Phase 3).
 *
 * The previously hand-authored object literal has moved to
 * `meshery/schemas` at
 * `schemas/constructs/v1beta1/credential/forms/prometheus.json`,
 * where a Go subset-validator (`validation/forms_test.go`) keeps it
 * structurally aligned with the canonical OpenAPI Credential construct
 * (the prometheus-specific shape lives inside the canonical free-form
 * `secret` map).
 *
 * Wire-level change: the field formerly keyed as `credentialName` is
 * now keyed as `name`, matching canonical `Credential.name`.
 *
 * The published Sistent export name (`prometheusCredentialSchema`)
 * is unchanged.
 */
export { PrometheusCredentialRjsfSchemaV1Beta1 as default } from '@meshery/schemas';
