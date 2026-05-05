/**
 * Schema for creating grafana credential;
 */
// TODO(meshery/schemas#866 — Phase 3): once `@meshery/schemas` ships
// `GrafanaCredentialRjsfSchemaV1Beta1` (canonical home:
// `typescript/forms/v1beta1/credential/`), flip this file to:
//
//     export { GrafanaCredentialRjsfSchemaV1Beta1 as default } from '@meshery/schemas';
//
// The published Sistent export name (`grafanaCredentialSchema`) MUST
// stay the same; only the source flips.
const grafanaCredentialSchema = {
  type: 'object',
  title: 'Grafana',
  properties: {
    credentialName: {
      title: 'Credential Name',
      type: 'string',
      description: 'Name of your credential'
    },
    secret: {
      type: 'object',
      title: 'Credential Secret',
      description: 'Credential secret for the Grafana instance',
      properties: {
        grafanaURL: {
          type: 'string',
          title: 'URL',
          description: 'URL of the Grafana instance'
        },
        grafanaAPIKey: {
          type: 'string',
          title: 'API Key',
          description: 'API Key for the Grafana instance'
        }
      },
      required: ['grafanaURL', 'grafanaAPIKey']
    }
  },
  required: ['credentialName']
};

export default grafanaCredentialSchema;
