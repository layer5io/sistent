/**
 * Schema for publish catalog item modal;
 * Can be use for publishing filters and designs
 */
const publishCatalogItemSchema = {
  type: 'object',
  properties: {
    compatibility: {
      type: 'array',
      title: 'Technology',
      items: {
        enum: ['kubernetes'],
        type: 'string'
      },
      uniqueItems: true,
      minItems: 1,
      description:
        'A list of technologies included in or implicated by this design; a list of relevant technology tags.',
      'x-rjsf-grid-area': 6
    },
    pattern_caveats: {
      type: 'string',
      title: 'Caveats and Considerations',
      description:
        'Specific stipulations to consider and known behaviors to be aware of when using this design.',
      format: 'textarea',
      'x-rjsf-grid-area': 12,
      'x-encode-in-uri': true
    },
    pattern_info: {
      type: 'string',
      title: 'Description',
      description: 'Purpose of the design along with its intended and unintended uses.',
      format: 'textarea',
      'x-rjsf-grid-area': 12,
      'x-encode-in-uri': true
    },
    type: {
      type: 'string',
      title: 'Type',
      enum: [
        'Deployment',
        'Observability',
        'Resiliency',
        'Scaling',
        'Security',
        'Traffic-management',
        'Troubleshooting',
        'Workloads'
      ],
      default: 'Deployment',
      description:
        'Categorization of the type of design or operational flow depicted in this design.',
      'x-rjsf-grid-area': 6
    }
  },
  required: ['compatibility', 'pattern_caveats', 'pattern_info', 'type']
};

export default publishCatalogItemSchema;
