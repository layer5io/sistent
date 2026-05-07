const importDesignUiSchema = {
  uploadType: {
    'ui:widget': 'radio'
  },
  // The conditional `file` property in importDesignSchema sources its `format`
  // from @meshery/schemas' DesignImportRjsfSchemaV1Beta3, which declares
  // `type: string` with no format. Without an explicit widget, RJSF falls
  // back to TextWidget — leaving the form without a real <input type="file">
  // element, which breaks the File Import flow (no Browse… button is shown).
  // Forcing 'ui:widget': 'file' here routes the field through whichever
  // FileWidget the consumer registers (e.g., Meshery's CustomFileWidget) and
  // emits the expected file input.
  file: {
    'ui:widget': 'file'
  },
  'ui:order': ['name', 'uploadType', 'file', 'url']
};

export default importDesignUiSchema;
