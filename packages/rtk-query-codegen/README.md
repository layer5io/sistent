# OpenAPI API Client Generation and Compilation

Generate an API client from an OpenAPI schema in YAML format and create a rtk-query api client. The provided Bash script streamlines this process and ensures a smooth workflow.

## Dependencies

Before proceeding, ensure you have the following dependencies installed:

1. **Node.js and npm:** Ensure you have Node.js and npm installed on your system. You can download them from [nodejs.org](https://nodejs.org/).

2. **redocly CLI (required):** If you prefer to use `swagger-cli` for schema conversion, you can install it globally using npm:

   ```bash
     npm i -g @redocly/cli@latest
   ```

   3 **TypeScript:**

   ```bash
     npm i -g typescript
   ```

## Usage

1. **Execute the Cli:**

   - Run the script using the following command:

     ```bash
     rtk-query-codegen -i /path/to/schema.yml -o /path/to/generated-api.js
     ```

   The script will execute the following steps:

   a. Convert the YAML schema (at `../../../models/openapi-schema/schema.yml`) to JSON schema at using `redocly` and save it as `openapi.json`.

   b. Generate the API client code using `@rtk-query/codegen-openapi` based on the JSON schema.

   c. Compile the TypeScript code to JavaScript using the TypeScript Compiler (`tsc`).

   d. Move the generated `api.js` to the output and remove the `dist` folder.

2. **Verification:** After executing the script, check your project directory for the compiled `api.js` file. You can use this file as your API client in your project.

## The Api.js file

The api.js file contains the generated api endpoints , it injects them into the base rtk client . And then exports all the hooks to use them .
If we need to override an api endpoint we can injectEnpoints in a separate file .

## Troubleshooting

- If any of the steps fail, the script will exit with a non-zero status code, indicating a failure. Review the error messages to diagnose and resolve any issues.

- Ensure that the Bash script is executable by running `chmod +x generate-api.sh`.

## Important Notes

- Make sure the OpenAPI schema (`schema.yml`) is updated with latest changes and doesnt contain any breaking changes .

- Always validate and test the generated API client to ensure it functions as expected.
