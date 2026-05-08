import importDesignSchema from '../schemas/importDesign/schema';
import importDesignUiSchema from '../schemas/importDesign/uiSchema';
import importFilterSchema from '../schemas/importFilter/schema';
import importModelSchema from '../schemas/importModel/schema';
import importModelUiSchema from '../schemas/importModel/uiSchema';

// These tests pin the @meshery/schemas v1.2.16 upgrade. The upstream release
// (meshery/schemas#889) routes import-form file inputs through RJSF's
// FileWidget by switching the `file`, `filterFile`, and `modelFile` properties
// to `format: "data-url"`. RJSF maps strings with `format: data-url` to
// FileWidget natively; before v1.2.16 these fields used `format: byte` (or no
// format at all on `modelFile`), which RJSF routed to TextWidget — so the
// rendered form lacked a real <input type="file"> and broke the integration
// tests that drive the file-import flow. If this regresses, the schemas
// re-exported from @meshery/schemas have drifted away from what consumers
// (notably Meshery) require.

type RjsfStringProperty = {
  type: string;
  format?: string;
  title?: string;
  description?: string;
};

const FILE_INPUT_FORMAT = 'data-url';

const getProperty = (
  schema: { properties?: Record<string, RjsfStringProperty> },
  name: string
): RjsfStringProperty => {
  const property = schema.properties?.[name];
  if (!property) {
    throw new Error(
      `Expected property "${name}" on schema, got ${JSON.stringify(schema.properties)}`
    );
  }
  return property;
};

describe('@meshery/schemas v1.2.16 import-form file inputs', () => {
  describe('DesignImport', () => {
    it('routes the `file` property through RJSF FileWidget via format: data-url', () => {
      const file = getProperty(importDesignSchema as never, 'file');
      expect(file.type).toBe('string');
      expect(file.format).toBe(FILE_INPUT_FORMAT);
    });

    it('keeps the canonical importDesign property set so the uiSchema order stays valid', () => {
      const props = Object.keys(
        (importDesignSchema as { properties: Record<string, unknown> }).properties
      );
      expect(props).toEqual(expect.arrayContaining(['name', 'uploadType', 'file', 'url']));
    });

    it('keeps `uploadType` as a radio in the local uiSchema', () => {
      expect(importDesignUiSchema.uploadType['ui:widget']).toBe('radio');
    });
  });

  describe('FilterImport', () => {
    it('routes the `filterFile` property through RJSF FileWidget via format: data-url', () => {
      const filterFile = getProperty(importFilterSchema as never, 'filterFile');
      expect(filterFile.type).toBe('string');
      expect(filterFile.format).toBe(FILE_INPUT_FORMAT);
    });
  });

  describe('ModelImport', () => {
    it('routes the `modelFile` property through RJSF FileWidget via format: data-url', () => {
      const modelFile = getProperty(importModelSchema as never, 'modelFile');
      expect(modelFile.type).toBe('string');
      expect(modelFile.format).toBe(FILE_INPUT_FORMAT);
    });

    it('drops the obsolete `file` workaround from the local uiSchema', () => {
      // Pre-v1.2.16, the local uiSchema overrode `file: { 'ui:widget': 'file' }`
      // to compensate for the missing format on `modelFile`. With v1.2.16 the
      // upstream property carries `format: data-url`, so the override would
      // both target a non-existent property and shadow the canonical routing.
      expect((importModelUiSchema as Record<string, unknown>).file).toBeUndefined();
    });

    it('orders the conditional file fields under their canonical names', () => {
      // The upstream schema names the file-bearing fields `modelFile`,
      // `modelCsv`, `componentCsv`, and `relationshipCsv` (not `file`/`csv`).
      // The local `ui:order` must reference the canonical names so RJSF can
      // resolve every entry — otherwise the unmatched names get silently
      // ignored and field ordering becomes implementation-defined.
      expect(importModelUiSchema['ui:order']).toEqual([
        'uploadType',
        'fileName',
        'modelFile',
        'url',
        'modelCsv',
        'componentCsv',
        'relationshipCsv'
      ]);
    });

    it('keeps the conditional File-Import branch requiring `modelFile`', () => {
      // The `uploadType: "file"` branch must still require `modelFile`; that's
      // what guarantees the FileWidget is actually rendered for the File
      // Import flow that the integration test suite drives.
      const allOf = (
        importModelSchema as { allOf?: Array<{ if?: unknown; then?: { required?: string[] } }> }
      ).allOf;
      expect(allOf).toBeDefined();
      const fileBranch = allOf?.find((branch) => {
        const ifClause = branch.if as
          | { properties?: { uploadType?: { const?: string } } }
          | undefined;
        return ifClause?.properties?.uploadType?.const === 'file';
      });
      expect(fileBranch?.then?.required).toEqual(expect.arrayContaining(['fileName', 'modelFile']));
    });
  });

  it('exposes import schemas with the data-url FileWidget contract end-to-end', () => {
    // A single sweep across all three forms so a downgrade or accidental
    // revert of any one of them is caught even if the per-form tests above
    // get reorganized.
    const fileFormatBindings: Array<[string, string]> = [
      [
        (importDesignSchema as never as { properties: { file: RjsfStringProperty } }).properties
          .file.format ?? '',
        'design.file'
      ],
      [
        (importFilterSchema as never as { properties: { filterFile: RjsfStringProperty } })
          .properties.filterFile.format ?? '',
        'filter.filterFile'
      ],
      [
        (importModelSchema as never as { properties: { modelFile: RjsfStringProperty } }).properties
          .modelFile.format ?? '',
        'model.modelFile'
      ]
    ];

    for (const [format, label] of fileFormatBindings) {
      expect({ label, format }).toEqual({ label, format: FILE_INPUT_FORMAT });
    }
  });
});
