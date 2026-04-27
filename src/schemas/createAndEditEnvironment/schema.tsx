import EnvironmentDefinitionV1Beta3OpenApiSchema from '@meshery/schemas/constructs/v1beta3/environment/EnvironmentSchema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const environmentSchema = (EnvironmentDefinitionV1Beta3OpenApiSchema as any).components.schemas;
const createAndEditEnvironmentSchema = {
  title: 'Environment',
  required: ['name'],
  properties: {
    description: {
      description: environmentSchema.EnvironmentPayload.properties.description.description,
      format: 'textarea',
      title: 'Description',
      type: environmentSchema.EnvironmentPayload.properties.description.type,
      'x-rjsf-grid-area': '12'
    },
    name: {
      description: environmentSchema.EnvironmentPayload.properties.name.description,
      title: 'Name',
      type: environmentSchema.EnvironmentPayload.properties.name.type,
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: environmentSchema.EnvironmentPayload.properties.organizationId.type,
      title: 'Organization',
      description: environmentSchema.EnvironmentPayload.properties.organizationId.description,
      enum: [],
      enumNames: [],
      'x-rjsf-grid-area': '12'
    }
  },
  type: 'object'
};

export default createAndEditEnvironmentSchema;
