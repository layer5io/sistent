# RJSF Schemas

RJSF, or React JSON Schema Form, schemas play a crucial role in defining the structure and behavior of forms. These schemas, written in JSON format, provide a blueprint for rendering forms dynamically and handling user input effectively.

### What are RJSF Schemas?

RJSF Schemas, based on the React JSON Schema Form library, define the structure, validation rules, and UI elements of dynamic forms in a standardized way. They enable the creation of consistent and flexible forms across our applications.

### How to Use RJSF Schemas

1. **Importing Schemas:**
   Include the required schema in your React component by importing it. For example:

   ```javascript
   import MyFormSchema from '@sistent/sistent';
   ```

1. **Rendering Forms:**
   Integrate the schema into your component to render the form dynamically. Use already created generic RJSF components or use RJSF Form component directly.

   ```javascript
   import { sampleSchema, sampleUiSchema } from '@sistent/sistent';
   <Form schema={sampleSchema} uiSchema={sampleUiSchema} onSubmit={handleFormSubmission} />;
   ```

1. **Customization:**
   Adjust the schema properties to tailor the form's appearance and behavior. Refer to the specific schema's documentation for customization options.

### Rendering a form without its top-level object title (the standard pattern)

The canonical schemas from `@meshery/schemas` carry a human-readable `title`
(and `description`) on their **root object** — for example the import-design
schema's root `title: "Import Design"`. That is correct for the schema, but
when the form is rendered inside a surface that already names it — most
commonly a modal whose header shows the very same title — RJSF draws that root
title a second time, directly above the fields:

- in the default `@rjsf/mui` template it shows as a **duplicate heading**;
- in the collapsible `ObjectFieldTemplate`s used downstream (Meshery, Meshery
  Cloud, Meshery Extensions) it shows as a **collapsed accordion** the user has
  to expand before they can even see the form.

Neither is desired. We want the root object's _contents_ (its child fields)
shown directly and the duplicative title gone — **while still consuming the
canonical UI schema verbatim** (no hand-edited fork, no mutation of the JSON
schema).

The standard, theme-agnostic way to do this is to set `ui:options.label = false`
on the **root** of the UI schema. RJSF's `ObjectField` then hands an empty
title (and no description) to whatever `ObjectFieldTemplate` is registered, so
every template skips its header and renders the child fields inline. Because
the lever is the UI schema and not the JSON schema, validation, `required`, and
conditional `allOf` branches stay untouched.

You rarely write that option by hand. Use whichever is convenient:

1. **`RJSFFormModal`** already does this for you — `hideRootTitle` defaults to
   `true`, because a modal always shows the title in its header:

   ```jsx
   import { RJSFFormModal, importDesignSchema, importDesignUiSchema } from '@sistent/sistent';

   <RJSFFormModal
     open={open}
     onClose={onClose}
     title="Import Design" // shown once, in the modal header
     buttonTitle="Import"
     schema={importDesignSchema}
     uiSchema={importDesignUiSchema} // used as-is; root title auto-suppressed
     onSubmit={handleImport}
   />;
   ```

2. **`RJSFFormWrapper`** exposes the same `hideRootTitle` prop (defaulting to
   `false`, so the standalone wrapper is unchanged unless you opt in):

   ```jsx
   <RJSFFormWrapper schema={schema} uiSchema={uiSchema} hideRootTitle />
   ```

3. **`hideRootObjectTitle(uiSchema)`** is the underlying helper, for when you
   assemble the UI schema yourself before handing it to a different RJSF
   surface (e.g. a consumer's own modal/wrapper). It returns a shallow copy —
   the input is never mutated and all other directives (`ui:order`, per-field
   overrides, existing `ui:options`) are preserved:

   ```jsx
   import { hideRootObjectTitle } from '@sistent/sistent';

   <SomeRjsfForm schema={schema} uiSchema={hideRootObjectTitle(uiSchema)} />;
   ```

### File Conventions for Schemas

Follow a consistent file structure convention to enhance clarity and organization when adding new schema:

1. Use the same name as the schema for the directory.
1. Use CamelCase for multi-word schema names, e.g., UserRegistrationFormSchema.
1. Create two separate files, schema.tsx and uiSchema.tsx, to store both schemas separately.

### Naming Conventions for Schemas

Follow a consistent naming convention to enhance clarity and organization when adding new schema:

1. Use descriptive names that convey the purpose of the form.
1. CamelCase for multi-word schema names, e.g., UserRegistrationFormSchema.
1. Include "Schema" in the name to explicitly indicate that it's a schema, e.g., ProfileSettingsSchema.
1. Include "UiSchema" in the name to explicitly indicate that it's a UI schema, e.g., ProfileSettingsUiSchema.

### Custom Properties

In addition to the properties offered by the JSON schema, we have introduced the following custom properties that you can include in new schema:

1. `x-rjsf-grid-area:` This property accepts an integer that defines the width of the field. For instance, specifying 6 means it will take up half of the parent width, while 12 signifies full width.
1. `x-encode-in-uri:` When set to true, this property enables RJSF to encode data in URI format and return it.
