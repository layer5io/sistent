/**
 * Schema for creating prometheus credential;
 */
// TODO(meshery/schemas#866 — Phase 3): once `@meshery/schemas` ships
// `PrometheusCredentialRjsfSchemaV1Beta1` (canonical home:
// `typescript/forms/v1beta1/credential/`), flip this file to:
//
//     export { PrometheusCredentialRjsfSchemaV1Beta1 as default } from '@meshery/schemas';
//
// The published Sistent export name (`prometheusCredentialSchema`)
// MUST stay the same; only the source flips.
const prometheusCredentialSchema = {
  type: 'object',
  title: 'Prometheus',
  properties: {
    credentialName: {
      title: 'Credential Name',
      type: 'string',
      description: 'Name of your credential'
    },
    secret: {
      type: 'object',
      title: 'Credential Secret',
      description: 'Credential secret for the Prometheus instance',
      properties: {
        prometheusURL: {
          type: 'string',
          title: 'URL',
          description: 'URL of the Prometheus instance'
        }
      },
      required: ['prometheusURL']
    }
  },
  required: ['credentialName']
};

export default prometheusCredentialSchema;
