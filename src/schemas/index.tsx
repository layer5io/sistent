import helpAndSupportModalSchema from './helpAndSupportModal/schema';
import helpAndSupportModalUiSchema from './helpAndSupportModal/uiSchema';

import createAndEditEnvironmentSchema from './createAndEditEnvironment/schema';
import createAndEditEnvironmentUiSchema from './createAndEditEnvironment/uiSchema';

import createAndEditWorkspaceSchema, {
  editWorkspace as editWorkspaceSchema
} from './createAndEditWorkspace/schema';
import createAndEditWorkspaceUiSchema from './createAndEditWorkspace/uiSchema';

import helmConnectionSchema from './helmConnection/schema';
import helmConnectionUiSchema from './helmConnection/uiSchema';

import importDesignSchema from './importDesign/schema';
import importDesignUiSchema from './importDesign/uiSchema';

import importFilterSchema from './importFilter/schema';
import importFilterUiSchema from './importFilter/uiSchema';

import importModelSchema from './importModel/schema';
import importModelUiSchema from './importModel/uiSchema';

import publishCatalogItemSchema from './publishCatalogItem/schema';
import publishCatalogItemUiSchema from './publishCatalogItem/uiSchema';

import kubernetesCredentialSchema from './kubernetesCredential/schema';
import kubernetesCredentialUiSchema from './kubernetesCredential/uiSchema';

import prometheusCredentialSchema from './prometheusCredential/schema';
import prometheusCredentialUiSchema from './prometheusCredential/uiSchema';

import grafanaCredentialSchema from './grafanaCredential/schema';
import grafanaCredentialSUiSchema from './grafanaCredential/uiSchema';

// Re-export @meshery/schemas v1beta1 OpenAPI schemas
//
// The v1beta1 re-exports below are kept for backward compatibility with
// external Sistent consumers. Per Phase 2.K of the identifier-naming
// migration (wire format = camelCase), new code should import the
// canonical-version schemas re-exported further down (e.g.
// `EnvironmentDefinitionV1Beta3OpenApiSchema`,
// `WorkspaceDefinitionV1Beta3OpenApiSchema`,
// `ModelDefinitionV1Beta2OpenApiSchema`).
export {
  BadgeSchema,
  CategoryDefinitionV1Beta1OpenApiSchema,
  ComponentDefinitionV1Beta1OpenApiSchema,
  DesignDefinitionV1Beta1OpenApiSchema,
  /**
   * @deprecated Superseded by `EnvironmentDefinitionV1Beta3OpenApiSchema`;
   *   the v1beta3 Environment API publishes `organizationId` (camelCase)
   *   on the wire instead of `organization_id`.
   */
  EnvironmentDefinitionV1Beta1OpenApiSchema,
  InvitationSchema,
  /**
   * @deprecated Superseded by `ModelDefinitionV1Beta2OpenApiSchema`;
   *   the v1beta2 Model API uses camelCase wire identifiers throughout.
   */
  ModelDefinitionV1Beta1OpenApiSchema,
  SubCategoryDefinitionV1Beta1OpenApiSchema,
  /**
   * @deprecated Superseded by `WorkspaceDefinitionV1Beta3OpenApiSchema`;
   *   the v1beta3 Workspace API publishes `organizationId` (camelCase)
   *   on the wire instead of `organization_id`.
   */
  WorkspaceDefinitionV1Beta1OpenApiSchema
} from '@meshery/schemas';

// Re-export @meshery/schemas v1beta2 OpenAPI schemas
export {
  ComponentDefinitionV1Beta2OpenApiSchema,
  ConnectionDefinitionV1Beta2OpenApiSchema,
  DesignDefinitionV1Beta2OpenApiSchema,
  InvitationDefinitionV1Beta2OpenApiSchema,
  RelationshipDefinitionV1Beta2OpenApiSchema
} from '@meshery/schemas';

// Re-export @meshery/schemas canonical (camelCase-on-the-wire) OpenAPI schemas.
// These are the Phase 2.K / Phase 3 canonical versions: new Sistent consumers
// should prefer these over the v1beta1 variants re-exported above.
export { default as ModelDefinitionV1Beta2OpenApiSchema } from '@meshery/schemas/constructs/v1beta2/model/ModelSchema';
export { default as EnvironmentDefinitionV1Beta3OpenApiSchema } from '@meshery/schemas/constructs/v1beta3/environment/EnvironmentSchema';
export { default as WorkspaceDefinitionV1Beta3OpenApiSchema } from '@meshery/schemas/constructs/v1beta3/workspace/WorkspaceSchema';

// Re-export @meshery/schemas v1alpha3 OpenAPI schemas
export { RelationshipDefinitionV1Alpha3OpenApiSchema } from '@meshery/schemas';

// Re-export @meshery/schemas type namespaces
export type { v1alpha1, v1alpha2, v1beta1, v1beta2 } from '@meshery/schemas';

// Re-export @meshery/schemas RTK Query clients (cloudApi)
export { cloudApi } from '@meshery/schemas/cloudApi';

// Re-export @meshery/schemas RTK Query clients (mesheryApi)
export { mesheryApi } from '@meshery/schemas/mesheryApi';

// Re-export @meshery/schemas API base utilities
export {
  cloudBaseApi,
  CURRENT_ORG_KEY,
  DEFAULT_DESIGN_VERSION,
  mesheryBaseApi,
  MESHERY_PROD_URL,
  SUPPORTED_SOCIAL_ACCOUNTS
} from '@meshery/schemas/api';

export {
  createAndEditEnvironmentSchema,
  createAndEditEnvironmentUiSchema,
  createAndEditWorkspaceSchema,
  createAndEditWorkspaceUiSchema,
  editWorkspaceSchema,
  grafanaCredentialSUiSchema,
  grafanaCredentialSchema,
  helmConnectionSchema,
  helmConnectionUiSchema,
  helpAndSupportModalSchema,
  helpAndSupportModalUiSchema,
  importDesignSchema,
  importDesignUiSchema,
  importFilterSchema,
  importFilterUiSchema,
  importModelSchema,
  importModelUiSchema,
  kubernetesCredentialSchema,
  kubernetesCredentialUiSchema,
  prometheusCredentialSchema,
  prometheusCredentialUiSchema,
  publishCatalogItemSchema,
  publishCatalogItemUiSchema
};
