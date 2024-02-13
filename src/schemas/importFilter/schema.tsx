const importFilterSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      description: 'The name of Filter',
      default: 'Unitled Filter File',
      'x-rjsf-grid-area': '6'
    },
    config: {
      type: 'string',
      title: 'WASM Filter Config',
      format: 'textarea',
      description:
        'Enter the configuration details. The configuration detail is the yaml string with running details',
      default:
        'This is an Exmaple config, config could be Yaml or JSON\ntyped_config:\r\n  "@type": type.googleapis.com/envoy.extensions.filters.http.wasm.v3.Wasm\r\n  config:\r\n    name: example-filter\r\n    rootId: my_root_id\r\n    vmConfig:\r\n      code:\r\n        local:\r\n          filename: /var/local/lib/wasm-filters/example-filter.wasm\r\n      runtime: envoy.wasm.runtime.v8\r\n      vmId: example-filter\r\n      allow_precompiled: true\r\nname: envoy.filters.http.wasm',
      'x-rjsf-grid-area': '12'
    },
    uploadType: {
      title: 'Select the Upload Method',
      enum: ['File Upload', 'URL Upload'],
      default: 'File Upload',
      'x-rjsf-grid-area': '6'
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
        title: 'via File',
        properties: {
          file: {
            type: 'string',
            format: 'file',
            description: 'Browse the filter file from your file system',
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
            const: 'URL Upload'
          }
        }
      },
      then: {
        title: 'via URL',
        properties: {
          url: {
            type: 'string',
            title: 'URL',
            format: 'uri',
            description: 'raw url of the filter file, example: https://raw.github.com/...',
            'x-rjsf-grid-area': '12'
          }
        },
        required: ['url']
      }
    }
  ]
};

export default importFilterSchema;
