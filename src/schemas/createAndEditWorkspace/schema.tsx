/**
 * Re-exports the canonical RJSF form schemas for the create-or-edit
 * workspace modal from @meshery/schemas. The schema is the authoritative
 * source for this form and is validated against the v1beta3 workspace
 * OpenAPI construct.
 *
 * NOTE: The canonical form uses `organizationId` (camelCase) as the wire
 * field name, aligning with the v1beta3 workspace schema's camelCase
 * convention. The prior hand-authored sistent schema used `organization`
 * as the field name. Consumers that bind to `schema.properties.organization`
 * must update to `schema.properties.organizationId`.
 *
 * NOTE: The `editWorkspace` export re-exports the same canonical schema.
 * Callers that previously relied on the reduced `required: ['organization']`
 * for the edit variant can pass an overriding `required` prop to the RJSF
 * Form component at the call site (RJSF supports this pattern).
 *
 * @see meshery/schemas#866 — migration from hand-authored to canonical
 * @see meshery/schemas schemas/constructs/v1beta3/workspace/forms/createOrEdit.json
 */
export { WorkspaceCreateOrEditRjsfSchemaV1Beta3 as default } from '@meshery/schemas';

/**
 * Edit-workspace variant: identical schema shape to the create variant.
 * The create/edit distinction (required vs. optional `name`) is handled
 * at the call site by passing a custom `required` array to the RJSF Form.
 */
export { WorkspaceCreateOrEditRjsfSchemaV1Beta3 as editWorkspace } from '@meshery/schemas';
