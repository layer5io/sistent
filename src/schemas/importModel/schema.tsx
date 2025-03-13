const importModelSchema = {
  type: 'object',
  required: ['uploadType'],
  properties: {
    uploadType: {
      type: 'string',
      title: 'Upload method',
      enum: ['File Import', 'URL Import', 'CSV Import'],
      enumDescriptions: [
        'Upload a model file (.tar, .tar.gz, .tgz) from your local system',
        'Import a model file using a direct URL to the source',
        'Upload separate CSV files for model definitions, components, and their relationships'
      ],
      default: 'Select the Upload Method',
      'x-rjsf-grid-area': '12',
      description:
        "Choose the method you prefer to upload your model file. Select 'File Import' or 'CSV Import' if you have the file on your local system or 'URL Import' if you have the file hosted online."
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
            type: 'string',
            format: 'file',
            description:
              'Supported model file formats are: .tar, .tar.gz, and .tgz. See [Import Models Documentation](https://docs.meshery.io/guides/configuration-management/importing-models#import-models-using-meshery-ui) for details',
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
            type: 'string',
            format: 'uri',
            title: 'URL',
            description:
              'A direct URL to a single model file, for example: https://raw.github.com/your-model-file.tar. Supported model file formats are: .tar, .tar.gz, and .tgz. \n\nFor bulk import of your model use the GitHub connection or CSV files. See [Import Models Documentation](https://docs.meshery.io/guides/configuration-management/importing-models#import-models-using-meshery-ui) for details',
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
