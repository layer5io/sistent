/**
 * Schema for create or edit workspace modals
 */
import WorkspaceDefinitionV1Beta3OpenApiSchema from '@meshery/schemas/constructs/v1beta3/workspace/WorkspaceSchema';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const workspaceSchema = (WorkspaceDefinitionV1Beta3OpenApiSchema as any).components.schemas;

/**
 * Create workspace schema - name is required
 */
const createAndEditWorkspace = {
  properties: {
    description: {
      description: workspaceSchema.WorkspacePayload.properties.description.description,
      format: 'textarea',
      title: 'Description',
      type: workspaceSchema.WorkspacePayload.properties.description.type,
      'x-rjsf-grid-area': '12'
    },
    name: {
      description: workspaceSchema.WorkspacePayload.properties.name.description,
      title: 'Name',
      type: workspaceSchema.WorkspacePayload.properties.name.type,
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: workspaceSchema.WorkspacePayload.properties.organizationId.type,
      description: workspaceSchema.WorkspacePayload.properties.organizationId.description,
      title: 'Organization',
      enum: [],
      enumNames: [],
      'x-rjsf-grid-area': '12'
    }
  },
  type: 'object',
  required: ['name', 'organization']
};

/**
 * Edit workspace schema - name is optional (derived from WorkspacePayload with relaxed requirements)
 */
const editWorkspace = {
  ...createAndEditWorkspace,
  required: ['organization']
};

export default createAndEditWorkspace;
export { editWorkspace };
