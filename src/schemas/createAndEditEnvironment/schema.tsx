const createAndEditEnvironmentSchema = {
  title: 'Environment',
  properties: {
    description: {
      description:
        'An environment is a collection of resources, such as connections & credentail. Provide a detailed description to clarify the purpose of this environment and the types of resources it encompasses. You can modify the description at any time. Learn more about environments [here](https://docs.meshery.io/concepts/logical/environments).',
      format: 'textarea',
      title: 'Description',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    name: {
      description:
        'An environment is a collection of resources. Provide a name that meaningfully represents these resources. You can change the name of the environment even after its creation.',
      title: 'Name',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: 'string',
      title: 'Organization',
      description:
        'Select an organization in which you want to create this new environment. Keep in mind that the organization cannot be changed after creation.',
      enum: [],
      enumNames: [],
      'x-rjsf-grid-area': '12'
    }
  },
  type: 'object'
};

export default createAndEditEnvironmentSchema;
