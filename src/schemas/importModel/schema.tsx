import { ModelDefinitionV1Beta1OpenApiSchema } from '@meshery/schemas';

const ModelSchema = ModelDefinitionV1Beta1OpenApiSchema.components.schemas;
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
