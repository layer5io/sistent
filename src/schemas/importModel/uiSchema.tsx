const importModelUiSchema = {
  uploadType: {
    'ui:widget': 'radio'
  },
  // The conditional `file` property in importModelSchema sources its `format`
  // from @meshery/schemas' ImportBody.oneOf[0].properties.modelFile, which
  // declares `type: string` with no format. Without an explicit widget,
  // RJSF falls back to TextWidget — leaving the form without a real
  // <input type="file"> element, which breaks the File Import flow and the
  // Playwright test that drives it. Forcing 'ui:widget': 'file' here routes
  // the field through whichever FileWidget the consumer registers (e.g.,
  // Meshery's CustomFileWidget) and emits the expected file input.
  file: {
    'ui:widget': 'file'
  },
  'ui:order': ['uploadType', 'file', 'url', 'csv']
};

export default importModelUiSchema;
