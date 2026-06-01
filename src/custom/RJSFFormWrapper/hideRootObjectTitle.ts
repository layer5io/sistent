/**
 * Standard pattern: render the CONTENTS of an RJSF form's root object
 * without the object's own title/description "header".
 *
 * ## Why this exists
 *
 * Sistent's RJSF form schemas are imported verbatim from `@meshery/schemas`
 * (the schema-driven-development mandate — see `src/schemas/readme.md`).
 * Those canonical schemas put a human-readable `title` on the root object
 * (e.g. the import-design schema's root `title: "Import Design"`). When the
 * form is rendered inside a titled surface — most commonly a modal whose
 * header ALREADY shows that title — RJSF draws the root object's title a
 * second time, directly above the fields. In the default `@rjsf/mui`
 * `ObjectFieldTemplate` that renders as a duplicate heading; in the custom
 * collapsible `ObjectFieldTemplate`s used by Meshery / Meshery Cloud /
 * Meshery Extensions it renders as a collapsed accordion the user has to
 * expand before they can even see the form.
 *
 * Neither is desired. We want the root object's *contents* (its child
 * fields) shown directly, and the duplicative root title gone — while still
 * consuming the canonical UI schema directly (no hand-edited fork, no
 * mutation of the JSON schema).
 *
 * ## How it works
 *
 * RJSF's `@rjsf/core` `ObjectField` derives the title it hands to the
 * registered `ObjectFieldTemplate` as:
 *
 * ```ts
 * title: uiOptions.label === false ? '' : (uiOptions.title ?? schema.title ?? ...)
 * description: uiOptions.label === false ? undefined : (uiOptions.description ?? schema.description)
 * ```
 *
 * So setting `ui:options.label = false` on the root of the UI schema forces
 * RJSF to pass an empty title (and no description) to *whatever*
 * `ObjectFieldTemplate` is in use. Every template in the ecosystem then
 * skips its header and renders the child properties directly:
 *
 *   - default `@rjsf/mui`: `title && <TitleFieldTemplate/>` → skipped
 *   - Meshery / Meshery Cloud custom templates: `uiSchema['ui:title'] || title`
 *     → `''` (falsy) → no collapsible header, children render inline
 *
 * Because the lever is the UI schema rather than the JSON schema, this keeps
 * the canonical schema pristine (validation, `required`, conditional
 * `allOf` branches are untouched) and is theme/template agnostic — the one
 * pattern works across the default Sistent form and every downstream
 * consumer's custom RJSF stack.
 *
 * @see https://github.com/rjsf-team/react-jsonschema-form `ObjectField`
 *      title/description derivation (`uiOptions.label === false`).
 */

/**
 * Returns a shallow copy of `uiSchema` with `ui:options.label` set to
 * `false`, suppressing the root object's title and description while
 * leaving its child fields (and every other UI-schema directive —
 * `ui:order`, per-field widget/options overrides, etc.) intact.
 *
 * The input is never mutated. Any pre-existing `ui:options` are preserved
 * and merged, with `label: false` taking precedence.
 *
 * @example
 * ```tsx
 * import { RJSFFormWrapper, hideRootObjectTitle } from '@sistent/sistent';
 * import { DesignImportRjsfSchemaV1Beta3 as schema,
 *          DesignImportRjsfUiSchemaV1Beta3 as uiSchema } from '@meshery/schemas';
 *
 * // Renders the import-design fields directly, no duplicate "Import Design"
 * // heading, while still using the canonical UI schema as-is.
 * <RJSFFormWrapper schema={schema} uiSchema={hideRootObjectTitle(uiSchema)} />
 * ```
 *
 * Prefer the `hideRootTitle` prop on `RJSFFormWrapper` / `RJSFFormModal`
 * (which calls this for you) for the common case; reach for the helper
 * directly when you assemble the UI schema yourself before handing it to a
 * different RJSF surface.
 */
export function hideRootObjectTitle<T extends Record<string, unknown> = Record<string, unknown>>(
  uiSchema?: T
): T {
  const existing = uiSchema?.['ui:options'];
  const existingOptions =
    typeof existing === 'object' && existing !== null ? (existing as Record<string, unknown>) : {};

  return {
    ...(uiSchema ?? ({} as T)),
    'ui:options': {
      ...existingOptions,
      label: false
    }
  } as T;
}

export default hideRootObjectTitle;
