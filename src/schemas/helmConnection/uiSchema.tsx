/**
 * UI schema for the create Helm repository connection form.
 *
 * Source-of-truth: re-exported from `@meshery/schemas` per the
 * form-schema canonicalization tracked in
 * https://github.com/meshery/schemas/issues/866. Sistent consumes the
 * canonical form UI schemas; it does not define them.
 *
 * The published Sistent export name (`helmConnectionUiSchema`) is unchanged.
 * The canonical UI schema keeps the same `ui:order` (name, description, url),
 * renders `description` as a textarea, and suppresses the duplicative RJSF
 * root-object title.
 *
 * @see meshery/schemas schemas/constructs/v1beta3/connection/forms/helmCreate.ui.json
 */
export { ConnectionHelmCreateRjsfUiSchemaV1Beta3 as default } from '@meshery/schemas';
