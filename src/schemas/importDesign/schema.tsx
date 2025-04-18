import { DesignDefinitionV1Beta1OpenApiSchema } from '@layer5/schemas';

const DesignSchema = DesignDefinitionV1Beta1OpenApiSchema.components.schemas;

const importDesignSchema = {
  type: 'object',
  properties: {
    name: {
      type: DesignSchema.MesheryPatternImportRequestBody.properties.name.type,
      title: 'Design file name',
      default: DesignSchema.MesheryPatternImportRequestBody.properties.name.default,
      'x-rjsf-grid-area': '12',
      description: DesignSchema.MesheryPatternImportRequestBody.properties.name.description
    },

    uploadType: {
      title: 'Upload method',
      enum: ['File Upload', 'URL Import'],
      default: 'URL Import',
      'x-rjsf-grid-area': '12',
      description: DesignSchema.MesheryPatternImportRequestBody.description
    }
  },

  allOf: [
    {
      if: {
        properties: {
          uploadType: {
            const: 'File Upload'
          }
        }
      },
      then: {
        properties: {
          file: {
            type: DesignSchema.MesheryPatternImportRequestBody.properties.file.type,
            format: DesignSchema.MesheryPatternImportRequestBody.properties.file.format,
            description: DesignSchema.MesheryPatternImportRequestBody.properties.file.description,
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
            type: DesignSchema.MesheryPatternImportRequestBody.properties.url.type,
            format: DesignSchema.MesheryPatternImportRequestBody.properties.url.format,
            title: 'URL',
            description: DesignSchema.MesheryPatternImportRequestBody.properties.url.description,
            'x-rjsf-grid-area': '12'
          }
        },
        required: ['url']
      }
    }
  ],
  required: ['uploadType', 'name']
};

export default importDesignSchema;
