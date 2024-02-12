/**
 * Schema for create or edit workspace modals
 */
const createAndEditWorkspace = {
  properties: {
    description: {
      description:
        "Workspaces serve as a virtual space for your team-based work, allows you to control access and more, Provide a detailed description to clarify the purpose of this workspace. Remember you can changes description of workspace after it's creations too. Learn more about workspaces [here](https://docs.meshery.io/concepts/logical/workspaces)",
      format: 'textarea',
      title: 'Description',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    name: {
      description:
        'Provide a name that meaningfully represents this workspace. You can change the name of the workspace even after its creation.',
      title: 'Name',
      type: 'string',
      'x-rjsf-grid-area': '12'
    },
    organization: {
      type: 'string',
      description:
        'Select an organization in which you want to create this new workspace. Keep in mind that the organization cannot be changed after creation.',
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
