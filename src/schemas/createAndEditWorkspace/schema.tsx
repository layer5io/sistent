/**
 * Schema for create or edit workspace modals
 */
const createAndEditWorkspace = {
  properties: {
    description: {
      description: 'Description of the Workspace',
      format: 'textarea',
      title: 'Description',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    name: {
      description: 'The name of Workspace',
      title: 'Name',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: 'string',
      title: 'Organization',
      enum: [],
      enumNames: [],
      'x-rjsf-grid-area': '12'
    }
  },
  type: 'object',
  required: ['name', 'organization']
};

export default createAndEditWorkspace;
