declare module '@meshery/schemas/constructs/v1beta2/model/ModelSchema' {
  const schema: typeof import('@meshery/schemas').ModelDefinitionV1Beta1OpenApiSchema;

  export default schema;
}

declare module '@meshery/schemas/constructs/v1beta3/environment/EnvironmentSchema' {
  const schema: typeof import('@meshery/schemas').EnvironmentDefinitionV1Beta1OpenApiSchema;

  export default schema;
}

declare module '@meshery/schemas/constructs/v1beta3/workspace/WorkspaceSchema' {
  const schema: typeof import('@meshery/schemas').WorkspaceDefinitionV1Beta1OpenApiSchema;

  export default schema;
}
