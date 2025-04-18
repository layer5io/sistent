/**
 * Schema for create or edit workspace modals
 */
import { WorkspaceDefinitionV1Beta1OpenApiSchema } from '@layer5/schemas';

const workspaceSchema = WorkspaceDefinitionV1Beta1OpenApiSchema.components.schemas;
const createAndEditWorkspace = {
  properties: {
    description: {
      description: workspaceSchema.workspacePayload.properties.description.description,
      format: 'textarea',
      title: 'Description',
      type: workspaceSchema.workspacePayload.properties.description.type,
      'x-rjsf-grid-area': '12'
    },
    name: {
      description: workspaceSchema.workspacePayload.properties.name.description,
      title: 'Name',
      type: workspaceSchema.workspacePayload.properties.name.type,
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: workspaceSchema.workspacePayload.properties.organization_id.type,
      description: workspaceSchema.workspacePayload.properties.organization_id.description,
      title: 'Organization',
      enum: [],
      enumNames: [],
      'x-rjsf-grid-area': '12'
    }
  },
  type: 'object',
  required: workspaceSchema.workspacePayload.required
};

export default createAndEditWorkspace;
