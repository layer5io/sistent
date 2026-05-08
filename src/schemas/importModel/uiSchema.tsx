// As of @meshery/schemas v1.2.16, the upstream import-model schema declares
// `format: "data-url"` on `modelFile`, so RJSF routes the conditional
// File-Import field through FileWidget natively — no explicit `'ui:widget'`
// override is required for `modelFile` here.
//
// The CSV-Import branch is different: `modelCsv`, `componentCsv`, and
// `relationshipCsv` carry `format: "binary"`, which RJSF does NOT map to
// FileWidget by default (the data-url route is the only format that triggers
// the file picker). Without the explicit `'ui:widget': 'file'` overrides
// below, those fields would render as TextWidget and silently break the CSV
// import flow. The same overrides are declared in the upstream
// `ModelImportRjsfUiSchemaV1Beta2`; we mirror them here so consumers using
// sistent's `importModelUiSchema` get the same FileWidget routing without
// having to merge with the upstream uiSchema.
const importModelUiSchema = {
  uploadType: {
    'ui:widget': 'radio'
  },
  modelCsv: {
    'ui:widget': 'file'
  },
  componentCsv: {
    'ui:widget': 'file'
  },
  relationshipCsv: {
    'ui:widget': 'file'
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
