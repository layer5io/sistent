import importDesignSchema from '../schemas/importDesign/schema';
import importDesignUiSchema from '../schemas/importDesign/uiSchema';
import importFilterSchema from '../schemas/importFilter/schema';
import importFilterUiSchema from '../schemas/importFilter/uiSchema';
import importModelSchema from '../schemas/importModel/schema';
import importModelUiSchema from '../schemas/importModel/uiSchema';

// These tests pin the canonical @meshery/schemas import-form contracts.
// The current upstream schemas keep branch-specific inputs like `file`,
// `filterFile`, and `modelFile` under conditional `allOf[].then/else`
// blocks instead of at the schema root, so the test helpers below flatten
// the top-level and conditional properties before asserting on them.
//
// The CSV branch is intentionally not on `data-url`: the upstream schema
// keeps `format: "binary"` on `modelCsv`/`componentCsv`/`relationshipCsv`,
// and RJSF does not map `binary` to FileWidget. The canonical contract
// there is "schema describes the payload, uiSchema picks the widget", so
// the canonical uiSchema carries the explicit `'ui:widget': 'file'`
// override on each CSV field. The tests below pin both halves so a
// downgrade or accidental drift in either layer is caught.

type RjsfStringProperty = {
  type: string;
  format?: string;
  title?: string;
  description?: string;
};

type RjsfProperties = Record<string, RjsfStringProperty>;

type RjsfSchemaShape = {
  properties?: RjsfProperties;
  allOf?: Array<{
    properties?: RjsfProperties;
    if?: { properties?: { uploadType?: { const?: string } } };
    then?: { properties?: RjsfProperties; required?: string[] };
    else?: { properties?: RjsfProperties; required?: string[] };
  }>;
};

const FILE_INPUT_FORMAT = 'data-url';
const CSV_INPUT_FORMAT = 'binary';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const asSchema = (schema: unknown): RjsfSchemaShape => {
  if (!isRecord(schema)) {
    throw new Error(`Expected schema object, got ${typeof schema}`);
  }

  return schema as RjsfSchemaShape;
};

const collectProperties = (schema: unknown): RjsfProperties => {
  const parsedSchema = asSchema(schema);
  const branchProperties =
    parsedSchema.allOf?.reduce<RjsfProperties>(
      (properties, branch) => ({
        ...properties,
        ...(branch.properties ?? {}),
        ...(branch.then?.properties ?? {}),
        ...(branch.else?.properties ?? {})
      }),
      {}
    ) ?? {};

  return {
    ...(parsedSchema.properties ?? {}),
    ...branchProperties
  };
};

const getProperty = (schema: unknown, name: string): RjsfStringProperty => {
  const properties = collectProperties(schema);
  const property = properties?.[name];
  if (!property) {
    throw new Error(`Expected property "${name}" on schema, got ${JSON.stringify(properties)}`);
  }
  return property;
};

const propertyNames = (schema: unknown): string[] => Object.keys(collectProperties(schema));

describe('@meshery/schemas import-form file inputs', () => {
  it('collects direct `allOf` properties used for schema composition', () => {
    const composedSchema = {
      allOf: [
        {
          properties: {
            inheritedField: {
              type: 'string',
              title: 'Inherited field'
            }
          }
        },
        {
          then: {
            properties: {
              conditionalField: {
                type: 'string',
                format: FILE_INPUT_FORMAT
              }
            }
          }
        }
      ]
    };

    expect(propertyNames(composedSchema)).toEqual(
      expect.arrayContaining(['inheritedField', 'conditionalField'])
    );
    expect(getProperty(composedSchema, 'inheritedField').title).toBe('Inherited field');
    expect(getProperty(composedSchema, 'conditionalField').format).toBe(FILE_INPUT_FORMAT);
  });

  describe('DesignImport', () => {
    it('routes the `file` property through RJSF FileWidget via format: data-url', () => {
      const file = getProperty(importDesignSchema, 'file');
      expect(file.type).toBe('string');
      expect(file.format).toBe(FILE_INPUT_FORMAT);
    });

    it('keeps the canonical importDesign property set so the uiSchema order stays valid', () => {
      expect(propertyNames(importDesignSchema)).toEqual(
        expect.arrayContaining(['name', 'uploadType', 'file', 'url'])
      );
    });

    it('orders `ui:order` against properties that exist on the schema', () => {
      const props = new Set(propertyNames(importDesignSchema));
      for (const entry of importDesignUiSchema['ui:order']) {
        expect(props.has(entry)).toBe(true);
      }
    });

    it('keeps `uploadType` as a radio in the local uiSchema', () => {
      expect(importDesignUiSchema.uploadType['ui:widget']).toBe('radio');
    });
  });

  describe('FilterImport', () => {
    it('routes the `filterFile` property through RJSF FileWidget via format: data-url', () => {
      const filterFile = getProperty(importFilterSchema, 'filterFile');
      expect(filterFile.type).toBe('string');
      expect(filterFile.format).toBe(FILE_INPUT_FORMAT);
    });

    it('keeps the canonical importFilter property set so the uiSchema order stays valid', () => {
      expect(propertyNames(importFilterSchema)).toEqual(
        expect.arrayContaining(['name', 'uploadType', 'filterFile', 'filterResource'])
      );
    });

    it('orders `ui:order` against properties that exist on the schema', () => {
      // The previous local uiSchema referenced `config`, `file`, and `url`
      // — none of which are properties on FilterImportRjsfSchemaV1Beta3
      // (`filterFile` and `filterResource` are). Such mismatched entries
      // are silently dropped by RJSF, leaving field ordering
      // implementation-defined.
      const props = new Set(propertyNames(importFilterSchema));
      for (const entry of importFilterUiSchema['ui:order']) {
        expect(props.has(entry)).toBe(true);
      }
      expect(importFilterUiSchema['ui:order']).toEqual([
        'name',
        'uploadType',
        'filterFile',
        'filterResource'
      ]);
    });
  });

  describe('ModelImport', () => {
    it('routes the `modelFile` property through RJSF FileWidget via format: data-url', () => {
      const modelFile = getProperty(importModelSchema, 'modelFile');
      expect(modelFile.type).toBe('string');
      expect(modelFile.format).toBe(FILE_INPUT_FORMAT);
    });

    it('keeps the conditional File-Import branch requiring `modelFile`', () => {
      // The `uploadType: "file"` branch must still require `modelFile`;
      // that's what guarantees the FileWidget is actually rendered for the
      // File Import flow that the integration test suite drives.
      const allOf = asSchema(importModelSchema).allOf;
      expect(allOf).toBeDefined();
      const fileBranch = allOf?.find(
        (branch) => branch.if?.properties?.uploadType?.const === 'file'
      );
      expect(fileBranch?.then?.required).toEqual(expect.arrayContaining(['fileName', 'modelFile']));
    });

    it('keeps `format: "binary"` on the CSV-Import payload fields', () => {
      // RJSF does NOT route `format: binary` to FileWidget; the CSV branch
      // therefore relies on the local uiSchema (asserted below) to bind
      // each CSV field to FileWidget explicitly.
      for (const field of ['modelCsv', 'componentCsv', 'relationshipCsv'] as const) {
        const property = getProperty(importModelSchema, field);
        expect(property.type).toBe('string');
        expect(property.format).toBe(CSV_INPUT_FORMAT);
      }
    });

    it('binds `modelFile` to RJSF FileWidget via the canonical uiSchema', () => {
      // The canonical upstream uiSchema now explicitly maps `modelFile` to
      // FileWidget as part of the published form contract, so consumers of
      // Sistent's re-exported uiSchema inherit the same behavior directly.
      const widget = (importModelUiSchema as Record<string, { 'ui:widget'?: string }>).modelFile;
      expect(widget?.['ui:widget']).toBe('file');
    });

    it('binds each CSV field to RJSF FileWidget via the local uiSchema', () => {
      // CSV payloads use `format: "binary"` upstream, which RJSF does not
      // map to FileWidget. The local uiSchema must therefore carry the
      // explicit `'ui:widget': 'file'` override so the CSV import flow
      // renders an <input type="file"> under whatever FileWidget the
      // consumer registers (e.g., Meshery's CustomFileWidget).
      for (const field of ['modelCsv', 'componentCsv', 'relationshipCsv'] as const) {
        const widget = (importModelUiSchema as Record<string, { 'ui:widget'?: string }>)[field];
        expect(widget?.['ui:widget']).toBe('file');
      }
    });

    it('orders the conditional file fields under their canonical names', () => {
      // The upstream schema names the file-bearing fields `modelFile`,
      // `modelCsv`, `componentCsv`, and `relationshipCsv` (not `file`/`csv`).
      // The local `ui:order` must reference the canonical names so RJSF can
      // resolve every entry — otherwise the unmatched names get silently
      // ignored and field ordering becomes implementation-defined.
      const props = new Set(propertyNames(importModelSchema));
      for (const entry of importModelUiSchema['ui:order']) {
        expect(props.has(entry)).toBe(true);
      }
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
  });

  it('exposes the expected file-format contract on every import payload input', () => {
    // Sweep all file-bearing inputs so schema regressions are caught in one
    // place, including the CSV branch that intentionally stays on
    // `format: "binary"` and relies on uiSchema for FileWidget routing.
    const fileFormatBindings: Array<[string, string, string]> = [
      ['design.file', getProperty(importDesignSchema, 'file').format ?? '', FILE_INPUT_FORMAT],
      [
        'filter.filterFile',
        getProperty(importFilterSchema, 'filterFile').format ?? '',
        FILE_INPUT_FORMAT
      ],
      [
        'model.modelFile',
        getProperty(importModelSchema, 'modelFile').format ?? '',
        FILE_INPUT_FORMAT
      ],
      ['model.modelCsv', getProperty(importModelSchema, 'modelCsv').format ?? '', CSV_INPUT_FORMAT],
      [
        'model.componentCsv',
        getProperty(importModelSchema, 'componentCsv').format ?? '',
        CSV_INPUT_FORMAT
      ],
      [
        'model.relationshipCsv',
        getProperty(importModelSchema, 'relationshipCsv').format ?? '',
        CSV_INPUT_FORMAT
      ]
    ];

    for (const [label, format, expectedFormat] of fileFormatBindings) {
      expect({ label, format }).toEqual({ label, format: expectedFormat });
    }
  });
});
