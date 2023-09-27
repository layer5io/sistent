import type { ConfigFile } from '@rtk-query/codegen-openapi';
const config: ConfigFile = {
    schemaFile: './openapi.json',
    apiFile: './empty-api.ts',
    apiImport: 'api',
    exportName: 'api',
    hooks: true,
    tag: true,
    outputFile: './api.ts'
};

export default config;
