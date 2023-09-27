const { program } = require('commander');
const { exec } = require('child_process');
const { renameSync, rmdirSync, unlinkSync } = require('fs');
const { dirname, basename, join } = require('path');

program
    .option('-i, --input <input>', 'Input YAML schema file path')
    .option('-o, --output <output>', 'Output path including the filename (e.g., /output/api.js)')
    .parse(process.argv);

// Function to run a command and handle success or failure
function runCommand(command, successMessage, failureMessage) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(failureMessage);
                console.error(stderr);
                reject(error);
            } else {
                console.log(successMessage);
                resolve();
            }
        });
    });
}

async function generateAPI(inputFilePath, outputFilePath) {
    try {
        // Convert YAML schema to JSON schema
        const yamlToJSONCommand = `redocly bundle ${inputFilePath} -o ./openapi.json --ext json`;
        await runCommand(yamlToJSONCommand, 'JSON bundle generation successful', 'JSON bundle generation failed');

        // Run OpenAPI generator
        const openApiGeneratorCommand = 'npx @rtk-query/codegen-openapi openapi-config.ts';
        await runCommand(openApiGeneratorCommand, 'OpenAPI generation successful', 'OpenAPI generation failed');

        // Run TypeScript compilation
        const tscCommand = 'tsc --build tsconfig.json';
        await runCommand(tscCommand, 'TypeScript compilation successful', 'TypeScript compilation failed');

        // Move api.js from the generated folder to the output path
        console.log('Removing Build Artifacts');
        const outputPath = dirname(outputFilePath);
        const outputFilename = basename(outputFilePath);
        renameSync('./dist/api.js', join(outputPath, outputFilename));
        rmdirSync('./dist', { recursive: true });
        unlinkSync('./openapi.json');
        unlinkSync('./api.ts');

        console.log('API generation successful');
        process.exit(0);
    } catch (error) {
        console.error('API generation failed');
        process.exit(1);
    }
}

const { input, output } = program.opts();

if (!input || !output) {
    console.error('Please provide both input and output options.');
    process.exit(1);
}

generateAPI(input, output);
