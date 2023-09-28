# OpenAPI API Client Generation and Compilation

Generate an API client from an OpenAPI schema in YAML format and create an `rtk-query` api client. The provided node script streamlines this process and ensures a smooth workflow.

## Dependencies

Before proceeding, ensure you have the following dependencies installed:

1. **Node.js and npm:** Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

2. **redocly CLI (required):** If you prefer to use `swagger-cli` for schema conversion, you can install it globally using npm:

```bash
npm install --global @redocly/cli@latest
```

## Usage

**Execute the CLI**

Run the script using the following command:

```bash
rtk-query-codgen -i /path/to/schema.yml -o /path/to/generated-api.js
```

The script will execute the following steps:

- Convert the YAML schema (at `../../../models/openapi-schema/schema.yml`) to JSON schema at using `redocly` and save it as `openapi.json`.
- Generate the API client code using `@rtk-query/codegen-openapi` based on the JSON schema.
- Compile the TypeScript code to JavaScript using the TypeScript Compiler (`tsc`).
- Move the generated `api.js` to the output and remove the `dist` folder.

**Verification:** After executing the script, check your project directory for the compiled `api.js` file. You can use this file as your API clien tin your project.

## The `api.js` file

The `api.js` file contains the generated API endpoints. The API endpoints injects them into the base RTK client, and then exports all the hooks to use them. If we need to override an API endpoint, we can inject endpoints in a separate file.

## Troubleshooting

- If any of the steps fail, the script will exit with a non-zero status code, indicating a failure. Review the error messages to diagnose and resolve any issues.
- Ensure that the Bash script is executable by running `chmod +x generate-api.sh`.

## Important notes

- Make sure the OpenAPI schema (`schema.yml`) is updated with latest changes and doesn't contain any breaking changes.
- Always validate and test the generated API client to ensure it functions as expected.
