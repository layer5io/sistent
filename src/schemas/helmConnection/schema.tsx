/**
 * Schema for configuring Helm repository connections. This schema is designed for use in a wizard or form
 * where users can provide information about connecting to a Helm repository for initiating connection.
 */
// TODO(meshery/schemas#866 — Phase 3): once `@meshery/schemas` ships
// `HelmConnectionRjsfSchemaV1Beta2` (canonical home:
// `typescript/forms/v1beta2/connection/`), flip this file to:
//
//     export { HelmConnectionRjsfSchemaV1Beta2 as default } from '@meshery/schemas';
//
// The published Sistent export name (`helmConnectionSchema`) MUST
// stay the same; only the source flips.
const helmConnectionSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Name',
      minLength: 1,
      description: 'A short, memorable name of the Helm repository connection.',
      'x-rjsf-grid-area': '12'
    },
    description: {
      type: 'string',
      title: 'Description',
      format: 'textarea',
      description: 'An explanation as to the purpose and/or use of this Helm repository.',
      'x-rjsf-grid-area': '12'
    },
    url: {
      type: 'string',
      title: 'URL',
      format: 'uri',
      description:
        'The URL (must be http/s) of the Helm repository in which one or more Helm charts are hosted.',
      'x-rjsf-grid-area': '12'
    }
  },
  required: ['name', 'url']
};

export default helmConnectionSchema;
