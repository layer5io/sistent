// TODO(meshery/schemas#866 — Phase 3): once `@meshery/schemas` ships
// `ModelImportRjsfSchemaV1Beta2` (canonical home: `typescript/forms/v1beta2/model/`),
// flip this file to:
//
//     export { ModelImportRjsfSchemaV1Beta2 as default } from '@meshery/schemas';
//
// The published Sistent export name (`importModelSchema`) MUST stay
// the same; only the source flips.
import ModelDefinitionV1Beta2OpenApiSchema from '@meshery/schemas/constructs/v1beta2/model/ModelSchema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModelSchema = (ModelDefinitionV1Beta2OpenApiSchema as any).components.schemas;
const importModelSchema = {
  type: 'object',
  required: ['uploadType'],
  properties: {
    uploadType: {
      type: ModelSchema.ImportRequest.properties.uploadType.type,
      title: 'Upload method',
      enum: ['File Import', 'URL Import', 'CSV Import'],
      enumDescriptions: ModelSchema.ImportRequest.properties.uploadType.enumDescriptions,
      default: 'Select the Upload Method',
      'x-rjsf-grid-area': '12',
      description: ModelSchema.ImportRequest.properties.uploadType.description
    }
  },
  allOf: [
    {
      if: {
        properties: {
          uploadType: {
            const: 'File Import'
          }
        }
      },
      then: {
        properties: {
          file: {
            type: ModelSchema.ImportBody.oneOf[0].properties.modelFile?.type,
            format: ModelSchema.ImportBody.oneOf[0].properties.modelFile?.format,
            description: ModelSchema.ImportBody.oneOf[0].properties.modelFile?.description,
            'x-rjsf-grid-area': '12'
          }
        },
        required: ['file']
      }
    },
    {
      if: {
        properties: {
          uploadType: {
            const: 'URL Import'
          }
        }
      },
      then: {
        properties: {
          url: {
            type: ModelSchema.ImportBody.oneOf[1].properties.url?.type,
            format: ModelSchema.ImportBody.oneOf[1].properties.url?.format,
            title: 'URL',
            description: ModelSchema.ImportBody.oneOf[1].properties.url?.description,
            'x-rjsf-grid-area': '12',
            disabled: true
          }
        },
        required: ['url']
      }
    }
  ]
};

export default importModelSchema;
