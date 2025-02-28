const importModelSchema = {
  type: 'object',
  properties: {
    uploadType: {
      title: 'Upload method',
      enum: ['File Import', 'URL Import'],
      default: 'Select the Upload Method',
      'x-rjsf-grid-area': '12',
      description:
        "Choose the method you prefer to upload your model file. Select 'File Upload' if you have the file on your local system or 'URL Import' if you have the file hosted online."
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
              'Browse the model file from your file system. Ensure file is an OCI artifact in .tar, .tar.gz or .tgz formats',
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
              'Provide the URL of the model you want to import. This should be a direct URL to the file, for example: https://raw.github.com/your-model-file.tar. Also, ensure file is an OCI artifact in .tar, .tar.gz or .tgz formats',
            'x-rjsf-grid-area': '12',
            disabled: true
          }
        }
      }
    }
  ],
  required: ['uploadType']
};

export default importModelSchema;
