const createAndEditEnvironmentSchema = {
  title: 'Environment',
  properties: {
    description: {
      description: 'Description of the Environment',
      format: 'textarea',
      title: 'Description',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    name: {
      description: "Enter a unique and meaningful name for the environment. Remember you can change name of environment after it's creation too",
      title: 'Name',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: 'string',
      title: 'Organization',
      description: "Select a organization in whic",
      enum: [],
      enumNames: [],
      'x-rjsf-grid-area': '12'
    }
  },
  type: 'object'
};

export default createAndEditEnvironmentSchema;
