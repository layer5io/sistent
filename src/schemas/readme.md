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
