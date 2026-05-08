const importFilterUiSchema = {
  // TEMPORARY downstream patch. The canonical FilterImportRjsfSchemaV1Beta3
  // in @meshery/schemas declares the conditional `file` property as
  // `type: string` with no `format`, so RJSF falls back to TextWidget and
  // no <input type="file"> renders — the Browse… button disappears.
  // Forcing `ui:widget: 'file'` routes the field through whichever
  // FileWidget the consumer registers (e.g., Meshery's CustomFileWidget).
  //
  // TODO: remove this override once @meshery/schemas declares
  // `format: 'data-url'` on the conditional `file` field (or publishes a
  // canonical UI schema that carries the widget hint), and Sistent bumps
  // the dep. See PR description for the upstream issue body to file.
  file: {
    'ui:widget': 'file'
  },
  'ui:order': ['name', 'uploadType', 'config', 'file', 'url']
};

export default importFilterUiSchema;
