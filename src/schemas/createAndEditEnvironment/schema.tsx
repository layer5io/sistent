import { EnvironmentDefinitionV1Beta1OpenApiSchema } from '@meshery/schemas';

const environmentSchema = EnvironmentDefinitionV1Beta1OpenApiSchema.components.schemas;
const createAndEditEnvironmentSchema = {
  title: 'Environment',
  required: ['name'],
  properties: {
    description: {
      description: environmentSchema.environmentPayload.properties.description.description,
      format: 'textarea',
      title: 'Description',
      type: environmentSchema.environmentPayload.properties.description.type,
      'x-rjsf-grid-area': '12'
    },
    name: {
      description: environmentSchema.environmentPayload.properties.name.description,
      title: 'Name',
      type: environmentSchema.environmentPayload.properties.name.type,
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: environmentSchema.environmentPayload.properties.OrganizationID.type,
      title: 'Organization',
      description: environmentSchema.environmentPayload.properties.OrganizationID.description,
      enum: [],
      enumNames: [],
      'x-rjsf-grid-area': '12'
    }
  },
  type: 'object'
};

export default createAndEditEnvironmentSchema;
