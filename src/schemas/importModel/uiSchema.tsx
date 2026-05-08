// As of @meshery/schemas v1.2.16, the upstream import-model schema declares
// `format: "data-url"` on `modelFile` (and `format: "binary"` on the CSV
// fields), so RJSF routes the conditional file inputs through FileWidget
// natively — no `'ui:widget': 'file'` override is required here. Consumers
// register their own FileWidget implementation against RJSF's widget
// registry (e.g., Meshery's CustomFileWidget) and it picks up the binding.
const importModelUiSchema = {
  uploadType: {
    'ui:widget': 'radio'
  },
  'ui:order': [
    'uploadType',
    'fileName',
    'modelFile',
    'url',
    'modelCsv',
    'componentCsv',
    'relationshipCsv'
  ]
};

export default importModelUiSchema;
