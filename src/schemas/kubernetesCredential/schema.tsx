/**
 * Schema for the Kubernetes credential modal.
 *
 * Source-of-truth: re-exported from `@meshery/schemas` per the form-schema
 * canonicalization tracked in
 * https://github.com/meshery/schemas/issues/866 (Phase 3).
 *
 * The previously hand-authored object literal has moved to
 * `meshery/schemas` at
 * `schemas/constructs/v1beta1/credential/forms/kubernetes.json`,
 * where a Go subset-validator (`validation/forms_test.go`) keeps it
 * structurally aligned with the canonical OpenAPI Credential construct
 * (the kubernetes-specific shape lives inside the canonical free-form
 * `secret` map).
 *
 * Wire-level change: the field formerly keyed as `credentialName` is
 * now keyed as `name`, matching canonical `Credential.name`. The
 * Meshery server's Credential endpoint already accepts the canonical
 * key per its OpenAPI; this brings the form payload into alignment.
 *
 * The published Sistent export name (`kubernetesCredentialSchema`)
 * is unchanged.
 */
export { KubernetesCredentialRjsfSchemaV1Beta1 as default } from '@meshery/schemas';
